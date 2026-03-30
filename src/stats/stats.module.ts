import { Module } from '@nestjs/common';
import { AuthGuardModule } from '../auth/auth-guard.module';
import { PrismaModule } from '../prisma/prisma.module';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [PrismaModule, AuthGuardModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
