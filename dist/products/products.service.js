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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(params) {
        const { page, pageSize, search, category, status, stockStatus, companyId } = params;
        const baseWhere = { companyId };
        if (category)
            baseWhere.category = category;
        if (status)
            baseWhere.status = status;
        if (search) {
            baseWhere.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { sku: { contains: search, mode: 'insensitive' } },
                { supplierName: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { category: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (!stockStatus) {
            const [total, items] = await Promise.all([
                this.prisma.product.count({ where: baseWhere }),
                this.prisma.product.findMany({
                    where: baseWhere,
                    orderBy: { updatedAt: 'desc' },
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                }),
            ]);
            return { total, items };
        }
        if (stockStatus === 'critical') {
            const where = { ...baseWhere, quantity: 0 };
            const [total, items] = await Promise.all([
                this.prisma.product.count({ where }),
                this.prisma.product.findMany({
                    where,
                    orderBy: { updatedAt: 'desc' },
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                }),
            ]);
            return { total, items };
        }
        const all = await this.prisma.product.findMany({
            where: baseWhere,
            orderBy: { updatedAt: 'desc' },
            take: 2000,
        });
        const filtered = all.filter((p) => {
            if (stockStatus === 'lowStock')
                return p.quantity > 0 && p.quantity < p.reorderLevel;
            return p.quantity >= p.reorderLevel;
        });
        const total = filtered.length;
        const items = filtered.slice((page - 1) * pageSize, page * pageSize);
        return { total, items };
    }
    async get(id, companyId) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product || product.companyId !== companyId) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    create(data) {
        return this.prisma.product.create({
            data: {
                id: (0, crypto_1.randomUUID)(),
                ...data,
                costPrice: data.costPrice,
                sellingPrice: data.sellingPrice,
                updatedAt: new Date(),
            },
        });
    }
    async update(id, data, companyId) {
        await this.get(id, companyId);
        return this.prisma.product.update({
            where: { id },
            data,
        });
    }
    async remove(id, companyId) {
        await this.get(id, companyId);
        return this.prisma.product.delete({ where: { id } });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map