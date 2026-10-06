import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Classic prisma-client-js setup: datasource URL comes from
// prisma/schema.prisma env("DATABASE_URL"). No driver adapter needed
// (@prisma/adapter-pg is installed but unused by this generator;
// the stale example in src/generated does not apply).

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({ log: ['error', 'warn'] });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
