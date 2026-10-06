import { Module } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { SupabaseAuthGuard } from './supabase-auth.guard';

// NOTE: @Global() is intentionally NOT set here. Guards are instead
// registered as APP_GUARDs in AppModule (fail-closed by default) and
// individual routes opt out via @Public() (e.g. GET /api/health).
// Both guards are exported so feature modules/tests can inject them.
@Module({
  providers: [SupabaseAuthGuard, RolesGuard],
  exports: [SupabaseAuthGuard, RolesGuard],
})
export class AuthGuardModule {}
