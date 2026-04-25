import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeOptional(value: string | undefined): string | null | undefined {
    if (value === undefined) return undefined;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  async create(profileId: string, dto: CreateCompanyDto) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    if (profile.companyId) {
      throw new BadRequestException('Company already exists for this user');
    }

    const company = await this.prisma.company.create({
      data: {
        id: randomUUID(),
        name: dto.name,
        industry: dto.industry,
        logoUrl: dto.logoUrl,
        updatedAt: new Date(),
      },
    });

    await this.prisma.profile.update({
      where: { id: profileId },
      data: {
        companyId: company.id,
        role: 'admin',
      },
    });

    return company;
  }

  async getMyCompany(profileId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
      include: { Company: true },
    });
    return profile?.Company ?? null;
  }

  async updateMyCompany(profileId: string, dto: UpdateCompanyDto) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
      select: { companyId: true },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    if (!profile.companyId) {
      throw new BadRequestException('Company setup required');
    }

    const data: {
      name?: string;
      industry?: string | null;
      logoUrl?: string | null;
      updatedAt: Date;
    } = {
      updatedAt: new Date(),
    };

    if (dto.name !== undefined) {
      const name = dto.name.trim();
      if (!name) {
        throw new BadRequestException('Company name cannot be empty');
      }
      data.name = name;
    }
    if (dto.industry !== undefined) {
      data.industry = this.normalizeOptional(dto.industry);
    }
    if (dto.logoUrl !== undefined) {
      data.logoUrl = this.normalizeOptional(dto.logoUrl);
    }

    if (Object.keys(data).length === 1) {
      throw new BadRequestException('No changes provided');
    }

    return this.prisma.company.update({
      where: { id: profile.companyId },
      data,
    });
  }
}
