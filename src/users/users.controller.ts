import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  async list() {
    const rows = await this.users.list();
    return rows.map(({ password, ...u }) => ({
      ...u,
      lastLogin: u.lastLogin?.toISOString(),
    }));
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const created = await this.users.create(dto);
    const { password, ...u } = created as any;
    return u;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const updated = await this.users.update(id, dto);
    const { password, ...u } = updated as any;
    return u;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.users.remove(id);
    return { ok: true };
  }
}

