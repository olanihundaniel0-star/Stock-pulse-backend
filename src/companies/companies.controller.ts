import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompaniesService } from './companies.service';
import { UpdateCompanyDto } from './dto/update-company.dto';

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
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateCompanyDto,
  ) {
    return this.companies.create(req.user.userId, dto);
  }

  @Get('mine')
  @UseGuards(SupabaseAuthGuard)
  async mine(@Req() req: AuthenticatedRequest) {
    return this.companies.getMyCompany(req.user.userId);
  }

  @Patch('mine')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  async updateMine(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateCompanyDto,
  ) {
    return this.companies.updateMyCompany(req.user.userId, dto);
  }
}
