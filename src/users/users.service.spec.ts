import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { SUPABASE_ADMIN } from '../supabase/supabase.module';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: {
    profile: {
      findUnique: jest.Mock;
      count: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
    transaction: {
      deleteMany: jest.Mock;
    };
  };
  let supabaseAdmin: {
    auth: {
      admin: {
        deleteUser: jest.Mock;
      };
    };
  };

  beforeEach(async () => {
    prisma = {
      profile: {
        findUnique: jest.fn(),
        count: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      transaction: {
        deleteMany: jest.fn(),
      },
    };

    supabaseAdmin = {
      auth: {
        admin: {
          deleteUser: jest.fn().mockResolvedValue({ error: null }),
        },
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prisma },
        { provide: SUPABASE_ADMIN, useValue: supabaseAdmin },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('remove', () => {
    const companyId = 'c1234567-0000-0000-0000-000000000001';
    const userId = 'u1234567-0000-0000-0000-000000000002';

    it('should throw ForbiddenException if user tries to delete self', async () => {
      prisma.profile.findUnique.mockResolvedValue({
        id: userId,
        companyId,
        role: 'admin',
      });

      await expect(service.remove(userId, companyId, userId)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw ForbiddenException if attempting to delete the last admin', async () => {
      prisma.profile.findUnique.mockResolvedValue({
        id: userId,
        companyId,
        role: 'admin',
      });
      prisma.profile.count.mockResolvedValue(1);

      await expect(
        service.remove(userId, companyId, 'other-admin-id'),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should deactivate user without deleting transactions', async () => {
      prisma.profile.findUnique.mockResolvedValue({
        id: userId,
        companyId,
        role: 'user',
      });
      prisma.profile.update.mockResolvedValue({
        id: userId,
        status: 'Inactive',
      });

      await service.remove(userId, companyId, 'admin-id');

      // Transactions must NOT be deleted
      expect(prisma.transaction.deleteMany).not.toHaveBeenCalled();
      // Profile must be updated to Inactive
      expect(prisma.profile.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: expect.objectContaining({ status: 'Inactive' }),
      });
      // Supabase user must be deleted
      expect(supabaseAdmin.auth.admin.deleteUser).toHaveBeenCalledWith(userId);
    });
  });
});
