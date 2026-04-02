import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

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
}
