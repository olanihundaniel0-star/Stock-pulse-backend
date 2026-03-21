import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async signup(name: string, email: string, password: string) {
    // Validate name
    if (!name || name.trim().length < 2) {
      throw new ConflictException('Name must be at least 2 characters');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ConflictException('Invalid email format');
    }

    const existingUser = await this.users.findByEmail(email);
    if (existingUser) throw new ConflictException('Email already in use');

    // Validate password strength
    if (password.length < 6) {
      throw new ConflictException('Password must be at least 6 characters');
    }

    const user = await this.users.create({
      name,
      email,
      password,
      role: UserRole.STAFF,
      status: 'Active',
    });

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role as UserRole,
    };

    const accessToken = await this.jwt.signAsync(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        lastLogin: user.lastLogin?.toISOString(),
      },
    };
  }

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (user.status !== 'Active')
      throw new UnauthorizedException('User is inactive');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    // Update lastLogin timestamp
    await this.users.updateLastLogin(user.id);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role as UserRole,
    };

    const accessToken = await this.jwt.signAsync(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        lastLogin: new Date().toISOString(),
      },
    };
  }
}

