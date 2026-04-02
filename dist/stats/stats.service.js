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
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
function dec(n) {
    if (n == null)
        return 0;
    return Number(n.toString());
}
let StatsService = class StatsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboard(companyId) {
        const products = await this.prisma.product.findMany({
            where: { companyId },
            select: {
                quantity: true,
                reorderLevel: true,
                costPrice: true,
                sellingPrice: true,
            },
        });
        const totalItems = products.length;
        const lowStockItems = products.filter((p) => p.quantity < p.reorderLevel).length;
        const inventoryValueCost = products.reduce((acc, p) => acc + dec(p.costPrice) * p.quantity, 0);
        const inventoryValueRetail = products.reduce((acc, p) => acc + dec(p.sellingPrice) * p.quantity, 0);
        const start = new Date();
        start.setUTCDate(start.getUTCDate() - 29);
        start.setUTCHours(0, 0, 0, 0);
        const recentTx = await this.prisma.transaction.findMany({
            where: {
                companyId,
                date: { gte: start },
            },
            select: {
                date: true,
                type: true,
                quantity: true,
                unitPrice: true,
            },
        });
        const todayStr = new Date().toISOString().split('T')[0];
        const todayOut = recentTx.filter((t) => t.date.toISOString().split('T')[0] === todayStr && t.type === client_1.TransactionType.STOCK_OUT);
        const todaySalesCount = todayOut.reduce((acc, t) => acc + t.quantity, 0);
        const todaySalesValue = todayOut.reduce((acc, t) => acc + dec(t.unitPrice) * t.quantity, 0);
        const chart = [];
        for (let i = 29; i >= 0; i--) {
            const d = new Date();
            d.setUTCDate(d.getUTCDate() - i);
            d.setUTCHours(0, 0, 0, 0);
            const dateStr = d.toISOString().split('T')[0];
            const dayTx = recentTx.filter((t) => t.date.toISOString().split('T')[0] === dateStr);
            const stockIn = dayTx
                .filter((t) => t.type === client_1.TransactionType.STOCK_IN)
                .reduce((acc, t) => acc + t.quantity, 0);
            const stockOut = dayTx
                .filter((t) => t.type === client_1.TransactionType.STOCK_OUT)
                .reduce((acc, t) => acc + t.quantity, 0);
            const sales = dayTx
                .filter((t) => t.type === client_1.TransactionType.STOCK_OUT)
                .reduce((acc, t) => acc + dec(t.unitPrice) * t.quantity, 0);
            chart.push({
                date: dateStr,
                label: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
                sales,
                stockIn,
                stockOut,
            });
        }
        return {
            totalItems,
            lowStockItems,
            inventoryValueCost,
            inventoryValueRetail,
            todaySalesCount,
            todaySalesValue,
            chart,
        };
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StatsService);
//# sourceMappingURL=stats.service.js.map