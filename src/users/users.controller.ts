import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

type AuthenticatedRequest = {
  user: {
    userId: string;
    companyId: string | null;
  };
};

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('me')
  @UseGuards(SupabaseAuthGuard)
  async me(@Req() req: { user: { userId: string } }) {
    return this.users.getMe(req.user.userId);
  }

  private requireCompanyId(req: AuthenticatedRequest): string {
    if (!req.user.companyId) {
      throw new ForbiddenException('Company setup required');
    }
    return req.user.companyId;
  }

  @Get()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  async list(@Req() req: AuthenticatedRequest) {
    const rows = await this.users.list(this.requireCompanyId(req));
    return rows.map((u) => this.users.toPublicRow(u));
  }

  @Post()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Req() req: AuthenticatedRequest, @Body() dto: CreateUserDto) {
    const created = await this.users.create(dto, this.requireCompanyId(req));
    return this.users.toPublicRow(created);
  }

  @Patch(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    const updated = await this.users.update(id, dto, this.requireCompanyId(req));
    return this.users.toPublicRow(updated);
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    await this.users.remove(id, this.requireCompanyId(req));
    return { ok: true };
  }
}
