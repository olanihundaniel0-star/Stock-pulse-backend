import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { PrismaService } from '../prisma/prisma.service';
import { SUPABASE_ANON } from '../supabase/supabase.module';
import { IS_PUBLIC_KEY } from './public.decorator';

type AuthUser = {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown>;
};

type SupabaseAuthCompat = {
  getUser: (
    token: string,
  ) => Promise<{
    data: { user: AuthUser | null };
    error: { message?: string } | null;
  }>;
};

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(
    @Inject(SUPABASE_ANON) private readonly supabase: SupabaseClient,
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Public routes (e.g. GET /api/health) skip authentication entirely.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest();
    const header = req.headers?.authorization as string | undefined;
    if (!header?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token');
    }
    const token = header.slice(7).trim();
    if (!token) {
      throw new UnauthorizedException('Missing bearer token');
    }
    const auth = this.supabase.auth as unknown as SupabaseAuthCompat;
    const {
      data: { user },
      error,
    } = await auth.getUser(token);
    if (error || !user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const email = user.email ?? `${user.id}@users.local`;
    const meta = user.user_metadata as Record<string, unknown> | undefined;
    const metaName =
      (typeof meta?.full_name === 'string' && meta.full_name) ||
      (typeof meta?.name === 'string' && meta.name) ||
      '';
    const name = metaName.trim() || email.split('@')[0] || 'User';

    // Keep upsert semantics (race-safe first-login creation). The try/catch
    // only maps a P2002 email collision (same email, different Supabase id)
    // to 401 instead of leaking a 500; logic inside is unchanged.
    // When the IdP provides no display name, preserve the existing stored
    // name and only refresh email/updatedAt to avoid clobbering user edits.
    let profile: {
      id: string;
      email: string;
      role: string;
      companyId: string | null;
      status: string;
    };
    try {
      profile = await this.prisma.profile.upsert({
        where: { id: user.id },
        create: {
          id: user.id,
          email,
          name,
          role: 'user',
          status: 'Active',
          updatedAt: new Date(),
        },
        update: metaName.trim()
          ? {
              email,
              name,
              updatedAt: new Date(),
            }
          : {
              email,
              updatedAt: new Date(),
            },
      });
    } catch (e) {
      if (
        typeof e === 'object' &&
        e !== null &&
        'code' in e &&
        (e as { code?: unknown }).code === 'P2002'
      ) {
        throw new UnauthorizedException(
          'Account email already linked to another user',
        );
      }
      throw e;
    }

    if (profile.status !== 'Active') {
      throw new UnauthorizedException('Account inactive');
    }

    req.user = {
      userId: profile.id,
      email: profile.email,
      role: profile.role,
      companyId: profile.companyId,
    };
    return true;
  }
}
