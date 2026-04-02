"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const companies_module_1 = require("./companies/companies.module");
const products_module_1 = require("./products/products.module");
const prisma_module_1 = require("./prisma/prisma.module");
const seed_service_1 = require("./seed/seed.service");
const supabase_module_1 = require("./supabase/supabase.module");
const transactions_module_1 = require("./transactions/transactions.module");
const users_module_1 = require("./users/users.module");
const stats_module_1 = require("./stats/stats.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            supabase_module_1.SupabaseModule,
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            transactions_module_1.TransactionsModule,
            stats_module_1.StatsModule,
            companies_module_1.CompaniesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, seed_service_1.SeedService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map