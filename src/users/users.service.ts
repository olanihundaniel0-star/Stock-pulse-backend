import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  list() {
    return this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(input: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    status: 'Active' | 'Inactive';
  }) {
    const passwordHash = await bcrypt.hash(input.password, 10);
    return this.prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: passwordHash,
        role: input.role,
        status: input.status,
      },
    });
  }

  update(id: string, patch: { role?: UserRole; status?: 'Active' | 'Inactive' }) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...(patch.role ? { role: patch.role } : {}),
        ...(patch.status ? { status: patch.status } : {}),
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}

