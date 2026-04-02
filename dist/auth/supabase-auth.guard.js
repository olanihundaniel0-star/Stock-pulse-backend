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
exports.SupabaseAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const prisma_service_1 = require("../prisma/prisma.service");
const supabase_module_1 = require("../supabase/supabase.module");
let SupabaseAuthGuard = class SupabaseAuthGuard {
    supabase;
    prisma;
    constructor(supabase, prisma) {
        this.supabase = supabase;
        this.prisma = prisma;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const header = req.headers?.authorization;
        if (!header?.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Missing bearer token');
        }
        const token = header.slice(7);
        const { data: { user }, error, } = await this.supabase.auth.getUser(token);
        if (error || !user) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
        const email = user.email ?? `${user.id}@users.local`;
        const meta = user.user_metadata;
        const metaName = (typeof meta?.full_name === 'string' && meta.full_name) ||
            (typeof meta?.name === 'string' && meta.name) ||
            '';
        const name = metaName.trim() || email.split('@')[0] || 'User';
        const profile = await this.prisma.profile.upsert({
            where: { id: user.id },
            create: {
                id: user.id,
                email,
                name,
                role: 'user',
                status: 'Active',
                updatedAt: new Date(),
            },
            update: {
                email,
                name,
                updatedAt: new Date(),
            },
        });
        if (profile.status !== 'Active') {
            throw new common_1.UnauthorizedException('Account inactive');
        }
        req.user = {
            userId: profile.id,
            email: profile.email,
            role: profile.role,
            companyId: profile.companyId,
        };
        return true;
    }
};
exports.SupabaseAuthGuard = SupabaseAuthGuard;
exports.SupabaseAuthGuard = SupabaseAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_module_1.SUPABASE_ANON)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient,
        prisma_service_1.PrismaService])
], SupabaseAuthGuard);
//# sourceMappingURL=supabase-auth.guard.js.map