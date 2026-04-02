import { CreateCompanyDto } from './dto/create-company.dto';
import { CompaniesService } from './companies.service';
type AuthenticatedRequest = {
    user: {
        userId: string;
    };
};
export declare class CompaniesController {
    private readonly companies;
    constructor(companies: CompaniesService);
    create(req: AuthenticatedRequest, dto: CreateCompanyDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        industry: string | null;
        logoUrl: string | null;
    }>;
    mine(req: AuthenticatedRequest): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        industry: string | null;
        logoUrl: string | null;
    } | null>;
}
export {};
