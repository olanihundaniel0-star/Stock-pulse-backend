import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    const seed = String(this.config.get('SEED_DEMO_USERS') ?? '').toLowerCase();
    if (['1', 'true', 'yes', 'on'].includes(seed)) {
      this.logger.warn(
        'SEED_DEMO_USERS is set but demo seed was removed. Create users via Supabase Auth (sign-up or dashboard), then sign in so a Profile row is created.',
      );
    }
  }
}
