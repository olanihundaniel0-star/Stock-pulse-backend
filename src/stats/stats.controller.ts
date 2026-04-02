import {
  Controller,
  ForbiddenException,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { StatsService } from './stats.service';

type AuthenticatedRequest = {
  user: {
    companyId: string | null;
  };
};

@Controller('stats')
export class StatsController {
  constructor(private readonly stats: StatsService) {}

  @Get()
  @UseGuards(SupabaseAuthGuard)
  dashboard(@Req() req: AuthenticatedRequest) {
    if (!req.user.companyId) {
      throw new ForbiddenException('Company setup required');
    }
    return this.stats.getDashboard(req.user.companyId);
  }
}
