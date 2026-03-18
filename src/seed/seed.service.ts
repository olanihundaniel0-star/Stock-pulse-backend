import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    const seed = String(this.config.get('SEED_DEMO_USERS') ?? '').toLowerCase();
    if (!['1', 'true', 'yes', 'on'].includes(seed)) return;
    if (!process.env.DATABASE_URL) return;

    const existing = await this.prisma.user.count();
    if (existing > 0) return;

    const adminPassword = await bcrypt.hash('admin123', 10);
    const staffPassword = await bcrypt.hash('staff123', 10);

    await this.prisma.user.createMany({
      data: [
        {
          name: 'Admin User',
          email: 'admin@stockpulse.com',
          password: adminPassword,
          role: UserRole.ADMIN,
          status: 'Active',
        },
        {
          name: 'Staff Member',
          email: 'staff@stockpulse.com',
          password: staffPassword,
          role: UserRole.STAFF,
          status: 'Active',
        },
      ],
    });

    this.logger.log('Seeded demo users (admin/staff).');
  }
}

