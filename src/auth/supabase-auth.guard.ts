import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { PrismaService } from '../prisma/prisma.service';
import { SUPABASE_ANON } from '../supabase/supabase.module';

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
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const header = req.headers?.authorization as string | undefined;
    if (!header?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token');
    }
    const token = header.slice(7);
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

    const profile = await this.prisma.profile.upsert({
      where: { id: user.id },
      create: {
        id: user.id,
        email,
        name,
        role: 'user',
        status: 'Active',
        updatedAt: new Date(),
      },
      update: {
        email,
        name,
        updatedAt: new Date(),
      },
    });

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
