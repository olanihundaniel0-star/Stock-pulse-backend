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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const supabase_auth_guard_1 = require("../auth/supabase-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const list_products_query_1 = require("./dto/list-products.query");
const upsert_product_dto_1 = require("./dto/upsert-product.dto");
const products_service_1 = require("./products.service");
let ProductsController = class ProductsController {
    products;
    constructor(products) {
        this.products = products;
    }
    requireCompanyId(req) {
        if (!req.user.companyId) {
            throw new common_1.ForbiddenException('Company setup required');
        }
        return req.user.companyId;
    }
    async list(req, q) {
        const companyId = this.requireCompanyId(req);
        const { total, items } = await this.products.list({
            search: q.search,
            category: q.category,
            status: q.status ? q.status : undefined,
            stockStatus: q.stockStatus,
            companyId,
            page: q.page,
            pageSize: q.pageSize,
        });
        return {
            total,
            items: items.map((p) => ({
                ...p,
                costPrice: Number(p.costPrice),
                sellingPrice: Number(p.sellingPrice),
            })),
        };
    }
    async get(req, id) {
        const p = await this.products.get(id, this.requireCompanyId(req));
        return {
            ...p,
            costPrice: Number(p.costPrice),
            sellingPrice: Number(p.sellingPrice),
        };
    }
    async create(req, dto) {
        const created = await this.products.create({
            ...dto,
            companyId: this.requireCompanyId(req),
            status: dto.status,
        });
        return {
            ...created,
            costPrice: Number(created.costPrice),
            sellingPrice: Number(created.sellingPrice),
        };
    }
    async update(req, id, dto) {
        const updated = await this.products.update(id, {
            ...dto,
            status: dto.status,
        }, this.requireCompanyId(req));
        return {
            ...updated,
            costPrice: Number(updated.costPrice),
            sellingPrice: Number(updated.sellingPrice),
        };
    }
    async remove(req, id) {
        await this.products.remove(id, this.requireCompanyId(req));
        return { ok: true };
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, list_products_query_1.ListProductsQuery]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "get", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upsert_product_dto_1.UpsertProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, upsert_product_dto_1.UpsertProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.UseGuards)(supabase_auth_guard_1.SupabaseAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map