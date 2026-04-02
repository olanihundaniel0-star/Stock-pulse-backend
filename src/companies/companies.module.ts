import { Module } from '@nestjs/common';
import { AuthGuardModule } from '../auth/auth-guard.module';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  imports: [AuthGuardModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
