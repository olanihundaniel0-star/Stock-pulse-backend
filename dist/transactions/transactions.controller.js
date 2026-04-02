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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const supabase_auth_guard_1 = require("../auth/supabase-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
const list_transactions_query_1 = require("./dto/list-transactions.query");
const transactions_service_1 = require("./transactions.service");
let TransactionsController = class TransactionsController {
    tx;
    constructor(tx) {
        this.tx = tx;
    }
    requireCompanyId(req) {
        if (!req.user.companyId) {
            throw new common_1.ForbiddenException('Company setup required');
        }
        return req.user.companyId;
    }
    async list(req, q) {
        const companyId = this.requireCompanyId(req);
        const { total, items } = await this.tx.list({
            type: q.type,
            productId: q.productId,
            search: q.search,
            from: q.from,
            to: q.to,
            companyId,
            page: q.page,
            pageSize: q.pageSize,
        });
        return {
            total,
            items: items.map((t) => ({
                id: t.id,
                productId: t.productId,
                productName: t.Product.name,
                type: t.type,
                quantity: t.quantity,
                unitPrice: t.unitPrice == null ? undefined : Number(t.unitPrice),
                unitCost: t.unitCost == null ? undefined : Number(t.unitCost),
                reason: t.reason ?? undefined,
                customer: t.customer ?? undefined,
                supplier: t.supplier ?? undefined,
                notes: t.notes ?? undefined,
                date: t.date.toISOString(),
                userId: t.profileId,
                userName: t.Profile.name,
            })),
        };
    }
    async create(req, body) {
        const created = await this.tx.create({
            profileId: req.user.userId,
            companyId: this.requireCompanyId(req),
            productId: body.productId,
            type: body.type,
            quantity: body.quantity,
            reason: body.reason,
            unitPrice: body.unitPrice,
            unitCost: body.unitCost,
            customer: body.customer,
            supplier: body.supplier,
            notes: body.notes,
            date: body.date,
        });
        return {
            id: created.id,
            productId: created.productId,
            productName: created.Product.name,
            type: created.type,
            quantity: created.quantity,
            unitPrice: created.unitPrice == null ? undefined : Number(created.unitPrice),
            unitCost: created.unitCost == null ? undefined : Number(created.unitCost),
            reason: created.reason ?? undefined,
            customer: created.customer ?? undefined,
            supplier: created.supplier ?? undefined,
            notes: created.notes ?? undefined,
            date: created.date.toISOString(),
            userId: created.profileId,
            userName: created.Profile.name,
        };
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, list_transactions_query_1.ListTransactionsQuery]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_transaction_dto_1.CreateTransactionDto]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "create", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, common_1.UseGuards)(supabase_auth_guard_1.SupabaseAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map