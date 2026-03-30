import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_ANON = 'SUPABASE_ANON_CLIENT';
export const SUPABASE_ADMIN = 'SUPABASE_ADMIN_CLIENT';

function createAnonClient(config: ConfigService): SupabaseClient {
  const url = config.getOrThrow<string>('SUPABASE_URL');
  const key = config.getOrThrow<string>('SUPABASE_ANON_KEY');
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function createAdminClient(config: ConfigService): SupabaseClient {
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
  exports: [SUPABASE_ANON, SUPABASE_ADMIN],
})
export class SupabaseModule {}
