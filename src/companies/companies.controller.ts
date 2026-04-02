import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompaniesService } from './companies.service';

type AuthenticatedRequest = {
  user: {
    userId: string;
  };
};

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companies: CompaniesService) {}

  @Post()
  @UseGuards(SupabaseAuthGuard)
  async create(@Req() req: AuthenticatedRequest, @Body() dto: CreateCompanyDto) {
    return this.companies.create(req.user.userId, dto);
  }

  @Get('mine')
  @UseGuards(SupabaseAuthGuard)
  async mine(@Req() req: AuthenticatedRequest) {
    return this.companies.getMyCompany(req.user.userId);
  }
}
