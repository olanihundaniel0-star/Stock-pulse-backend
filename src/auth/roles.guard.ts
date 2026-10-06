import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';
import { ROLES_KEY } from './roles.decorator';

const ROLE_RANK: Record<string, number> = { user: 1, admin: 2 };

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Fail-open only for explicitly @Public() routes (e.g. /api/health);
    // everything else stays fail-closed below.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? [];

    if (requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as { role?: string } | undefined;
    if (!user?.role) return false;

    // Case-insensitive compare + hierarchy: admin implies user.
    const actualRank = ROLE_RANK[user.role.toLowerCase()] ?? 0;
    return requiredRoles.some((required) => {
      const requiredRank = ROLE_RANK[required.toLowerCase()] ?? Infinity;
      return actualRank >= requiredRank;
    });
  }
}
