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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let TransactionsService = class TransactionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(params) {
        const where = { companyId: params.companyId };
        if (params.type)
            where.type = params.type;
        if (params.productId)
            where.productId = params.productId;
        if (params.from || params.to) {
            where.date = {};
            if (params.from)
                where.date.gte = new Date(params.from);
            if (params.to)
                where.date.lte = new Date(params.to);
        }
        if (params.search) {
            where.OR = [
                { Product: { name: { contains: params.search, mode: 'insensitive' } } },
                { Profile: { name: { contains: params.search, mode: 'insensitive' } } },
            ];
        }
        const [total, items] = await Promise.all([
            this.prisma.transaction.count({ where }),
            this.prisma.transaction.findMany({
                where,
                include: { Product: true, Profile: true },
                orderBy: { date: 'desc' },
                skip: (params.page - 1) * params.pageSize,
                take: params.pageSize,
            }),
        ]);
        return { total, items };
    }
    async create(input) {
        return this.prisma.$transaction(async (tx) => {
            const product = await tx.product.findFirst({
                where: { id: input.productId, companyId: input.companyId },
            });
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            const delta = input.type === client_1.TransactionType.STOCK_IN ? input.quantity : -input.quantity;
            if (input.type === client_1.TransactionType.STOCK_OUT && product.quantity < input.quantity) {
                throw new common_1.BadRequestException('Insufficient stock for stock-out');
            }
            const updatedProduct = await tx.product.update({
                where: { id: product.id },
                data: {
                    quantity: { increment: delta },
                    ...(input.type === client_1.TransactionType.STOCK_IN && input.unitCost != null
                        ? { costPrice: input.unitCost }
                        : {}),
                },
            });
            const created = await tx.transaction.create({
                data: {
                    id: (0, crypto_1.randomUUID)(),
                    companyId: input.companyId,
                    productId: updatedProduct.id,
                    profileId: input.profileId,
                    type: input.type,
                    quantity: input.quantity,
                    reason: input.type === client_1.TransactionType.STOCK_OUT ? input.reason : undefined,
                    unitPrice: input.type === client_1.TransactionType.STOCK_OUT ? input.unitPrice : undefined,
                    unitCost: input.type === client_1.TransactionType.STOCK_IN ? input.unitCost : undefined,
                    customer: input.customer,
                    supplier: input.supplier,
                    notes: input.notes,
                    date: input.date ? new Date(input.date) : undefined,
                },
                include: { Product: true, Profile: true },
            });
            return created;
        });
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map