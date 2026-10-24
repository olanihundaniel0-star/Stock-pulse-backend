import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SupabaseAuthGuard } from './supabase-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { SUPABASE_ANON } from '../supabase/supabase.module';

describe('SupabaseAuthGuard', () => {
  let guard: SupabaseAuthGuard;
  let reflector: {
    getAllAndOverride: jest.Mock;
  };
  let prisma: {
    profile: {
      findUnique: jest.Mock;
      create: jest.Mock;
      upsert: jest.Mock;
    };
  };
  let supabaseAnon: {
    auth: {
      getUser: jest.Mock;
    };
  };

  beforeEach(async () => {
    reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(false),
    };
    prisma = {
      profile: {
        findUnique: jest.fn(),
        create: jest.fn(),
        upsert: jest.fn(),
      },
    };
    supabaseAnon = {
      auth: {
        getUser: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupabaseAuthGuard,
        { provide: Reflector, useValue: reflector },
        { provide: PrismaService, useValue: prisma },
        { provide: SUPABASE_ANON, useValue: supabaseAnon },
      ],
    }).compile();

    guard = module.get<SupabaseAuthGuard>(SupabaseAuthGuard);
  });

  function mockContext(authHeader?: string) {
    const req = {
      headers: {
        authorization: authHeader,
      },
      user: undefined as unknown,
    };
    return {
      switchToHttp: () => ({
        getRequest: () => req,
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
      req,
    } as unknown as ExecutionContext & { req: typeof req };
  }

  it('should skip authentication for @Public() routes', async () => {
    reflector.getAllAndOverride.mockReturnValue(true);
    const ctx = mockContext();

    const allowed = await guard.canActivate(ctx);
    expect(allowed).toBe(true);
    expect(supabaseAnon.auth.getUser).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException if authorization header is missing', async () => {
    const ctx = mockContext(undefined);
    await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
  });

  it('should not perform database write if active profile already exists (read-first)', async () => {
    const ctx = mockContext('Bearer valid-token');
    supabaseAnon.auth.getUser.mockResolvedValue({
      data: {
        user: {
          id: 'user-123',
          email: 'test@example.com',
          user_metadata: { full_name: 'OAuth Name' },
        },
      },
      error: null,
    });
    prisma.profile.findUnique.mockResolvedValue({
      id: 'user-123',
      email: 'test@example.com',
      name: 'Custom App Name',
      role: 'user',
      companyId: 'company-abc',
      status: 'Active',
    });

    const allowed = await guard.canActivate(ctx);

    expect(allowed).toBe(true);
    // Verified read-first: findUnique called, create & upsert NOT called
    expect(prisma.profile.findUnique).toHaveBeenCalledWith({
      where: { id: 'user-123' },
      select: expect.any(Object),
    });
    expect(prisma.profile.create).not.toHaveBeenCalled();
    expect(prisma.profile.upsert).not.toHaveBeenCalled();
    expect(ctx.req.user).toEqual({
      userId: 'user-123',
      email: 'test@example.com',
      role: 'user',
      companyId: 'company-abc',
    });
  });

  it('should provision profile on first login when profile does not exist', async () => {
    const ctx = mockContext('Bearer valid-token');
    supabaseAnon.auth.getUser.mockResolvedValue({
      data: {
        user: {
          id: 'new-user-456',
          email: 'new@example.com',
          user_metadata: { name: 'New User' },
        },
      },
      error: null,
    });
    prisma.profile.findUnique.mockResolvedValue(null);
    prisma.profile.create.mockResolvedValue({
      id: 'new-user-456',
      email: 'new@example.com',
      name: 'New User',
      role: 'user',
      companyId: null,
      status: 'Active',
    });

    const allowed = await guard.canActivate(ctx);

    expect(allowed).toBe(true);
    expect(prisma.profile.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        id: 'new-user-456',
        email: 'new@example.com',
        name: 'New User',
        role: 'user',
        status: 'Active',
      }),
      select: expect.any(Object),
    });
  });

  it('should throw UnauthorizedException if profile status is Inactive', async () => {
    const ctx = mockContext('Bearer valid-token');
    supabaseAnon.auth.getUser.mockResolvedValue({
      data: {
        user: { id: 'inactive-user', email: 'inactive@example.com' },
      },
      error: null,
    });
    prisma.profile.findUnique.mockResolvedValue({
      id: 'inactive-user',
      email: 'inactive@example.com',
      role: 'user',
      companyId: null,
      status: 'Inactive',
    });

    await expect(guard.canActivate(ctx)).rejects.toThrow('Account inactive');
  });
});
