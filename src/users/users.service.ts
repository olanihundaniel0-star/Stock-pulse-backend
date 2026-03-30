import {
  BadRequestException,
  Injectable,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { PrismaService } from '../prisma/prisma.service';
import { SUPABASE_ADMIN } from '../supabase/supabase.module';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SUPABASE_ADMIN) private readonly supabaseAdmin: SupabaseClient,
  ) {}

  toPublicRow(p: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    lastLogin: Date | null;
  }) {
    return {
      id: p.id,
      name: p.name,
      email: p.email,
      role: p.role,
      status: p.status,
      lastLogin: p.lastLogin?.toISOString(),
    };
  }

  async getMe(id: string) {
    const p = await this.prisma.profile.findUnique({ where: { id } });
    if (!p) throw new NotFoundException('Profile not found');
    return { success: true, user: this.toPublicRow(p) };
  }

  findById(id: string) {
    return this.prisma.profile.findUnique({ where: { id } });
  }

  list() {
    return this.prisma.profile.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(dto: CreateUserDto) {
    const { data, error } = await this.supabaseAdmin.auth.admin.createUser({
      email: dto.email,
      password: dto.password,
      email_confirm: true,
      user_metadata: { full_name: dto.name, name: dto.name },
    });
    if (error || !data.user) {
      throw new BadRequestException(error?.message ?? 'Failed to create auth user');
    }
    const uid = data.user.id;
    try {
      const row = await this.prisma.profile.create({
        data: {
          id: uid,
          email: dto.email,
          name: dto.name,
          role: dto.role,
          status: dto.status,
          updatedAt: new Date(),
        },
      });
      return row;
    } catch (e) {
      await this.supabaseAdmin.auth.admin.deleteUser(uid);
      throw e;
    }
  }

  async update(id: string, dto: UpdateUserDto) {
    const existing = await this.prisma.profile.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('User not found');
    return this.prisma.profile.update({
      where: { id },
      data: {
        ...(dto.name != null ? { name: dto.name } : {}),
        ...(dto.role != null ? { role: dto.role } : {}),
        ...(dto.status != null ? { status: dto.status } : {}),
      },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.profile.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('User not found');
    await this.prisma.transaction.deleteMany({ where: { profileId: id } });
    await this.prisma.profile.delete({ where: { id } });
    const { error } = await this.supabaseAdmin.auth.admin.deleteUser(id);
    if (error) {
      throw new BadRequestException(error.message);
    }
  }
}
