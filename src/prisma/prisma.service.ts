import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from './prisma-client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const DEV_FALLBACK_URL =
  'postgresql://postgres:postgres@localhost:5432/postgres?schema=public';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const isProd = process.env.NODE_ENV === 'production';
    const fromEnv = process.env.DATABASE_URL;
    if (isProd && !fromEnv) {
      throw new Error('DATABASE_URL is required when NODE_ENV is production');
    }
    const connectionString = fromEnv ?? DEV_FALLBACK_URL;
    const pool = new Pool({ connectionString });
    super({ adapter: new PrismaPg(pool) } as any);
  }

  async onModuleInit() {
    if (process.env.NODE_ENV === 'test' && !process.env.DATABASE_URL) {
      return;
    }
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    (this as any).$on('beforeExit', async () => {
      await app.close();
    });
  }
}
