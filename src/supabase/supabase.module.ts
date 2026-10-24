import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_ANON = 'SUPABASE_ANON_CLIENT';
export const SUPABASE_ADMIN = 'SUPABASE_ADMIN_CLIENT';

function createAnonClient(config: ConfigService) {
  const url = config.getOrThrow<string>('SUPABASE_URL');
  const key = config.getOrThrow<string>('SUPABASE_ANON_KEY');
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function createAdminClient(config: ConfigService) {
  const url = config.getOrThrow<string>('SUPABASE_URL');
  const key = config.getOrThrow<string>('SUPABASE_SERVICE_ROLE_KEY');
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: SUPABASE_ANON,
      useFactory: createAnonClient,
      inject: [ConfigService],
    },
    {
      provide: SUPABASE_ADMIN,
      useFactory: createAdminClient,
      inject: [ConfigService],
    },
  ],
  // SECURITY: only the two client tokens are exported — never export the raw
  // service_role key itself. SUPABASE_ADMIN (service_role) must only be
  // injected in trusted server-side code (UsersService admin user
  // create/delete). Never import it in controllers, never send it to clients,
  // and never log its value. SUPABASE_ANON is safe for token verification via
  // auth.getUser(). Both are @Global() so feature modules need no re-import.
  exports: [SUPABASE_ANON, SUPABASE_ADMIN],
})
export class SupabaseModule {}
