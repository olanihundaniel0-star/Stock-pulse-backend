"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const prisma_service_1 = require("../prisma/prisma.service");
let CompaniesService = class CompaniesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(profileId, dto) {
        const profile = await this.prisma.profile.findUnique({
            where: { id: profileId },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        if (profile.companyId) {
            throw new common_1.BadRequestException('Company already exists for this user');
        }
        const company = await this.prisma.company.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
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
    async getMyCompany(profileId) {
        const profile = await this.prisma.profile.findUnique({
            where: { id: profileId },
            include: { Company: true },
        });
        return profile?.Company ?? null;
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map