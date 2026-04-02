import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
export declare class CompaniesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(profileId: string, dto: CreateCompanyDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        industry: string | null;
        logoUrl: string | null;
    }>;
    getMyCompany(profileId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        industry: string | null;
        logoUrl: string | null;
    } | null>;
}
