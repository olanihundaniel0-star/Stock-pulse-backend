import {
  BadRequestException,
  Inject,
  Injectable,
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
    companyId?: string | null;
  }) {
    return {
      id: p.id,
      name: p.name,
      email: p.email,
      role: p.role,
      status: p.status,
      lastLogin: p.lastLogin?.toISOString(),
      companyId: p.companyId ?? null,
    };
  }

  async getMe(id: string) {
    const profile = await this.prisma.profile.findUnique({ where: { id } });
    const userEmail = profile?.email ?? `${id}@users.local`;
    const userName = profile?.name ?? userEmail;
    const userCount = await this.prisma.profile.count();
    const roleId = userCount === 0 ? 1 : 2;

    const user = await this.prisma.profile.upsert({
      where: { id },
      update: {
        lastLogin: new Date(),
      },
      create: {
        id,
        email: userEmail,
        name: userName || userEmail,
        role: roleId === 1 ? 'admin' : 'user',
        status: 'Active',
        updatedAt: new Date(),
      },
    });

    const role = profile?.role ?? 'user';

    return {
      success: true,
      user: this.toPublicRow({
        id: user.id,
        name: user.name,
        email: user.email,
        role,
        status: user.status,
        lastLogin: user.lastLogin ?? null,
        companyId: profile?.companyId ?? null,
      }),
    };
  }

  findById(id: string) {
    return this.prisma.profile.findUnique({ where: { id } });
  }

  list(companyId: string) {
    return this.prisma.profile.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateUserDto, companyId: string) {
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
          companyId,
          updatedAt: new Date(),
        },
      });
      return row;
    } catch (e) {
      await this.supabaseAdmin.auth.admin.deleteUser(uid);
      throw e;
    }
  }

  async update(id: string, dto: UpdateUserDto, companyId: string) {
    const existing = await this.prisma.profile.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('User not found');
    if (existing.companyId !== companyId) throw new NotFoundException('User not found');

    return this.prisma.profile.update({
      where: { id },
      data: {
        ...(dto.name != null ? { name: dto.name } : {}),
        ...(dto.role != null ? { role: dto.role } : {}),
        ...(dto.status != null ? { status: dto.status } : {}),
      },
    });
  }

  async remove(id: string, companyId: string) {
    const existing = await this.prisma.profile.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('User not found');
    if (existing.companyId !== companyId) throw new NotFoundException('User not found');

    await this.prisma.transaction.deleteMany({
      where: { profileId: id, companyId },
    });
    await this.prisma.profile.delete({ where: { id } });

    const { error } = await this.supabaseAdmin.auth.admin.deleteUser(id);
    if (error) {
      throw new BadRequestException(error.message);
    }
  }
}
