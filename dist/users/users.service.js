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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const prisma_service_1 = require("../prisma/prisma.service");
const supabase_module_1 = require("../supabase/supabase.module");
let UsersService = class UsersService {
    prisma;
    supabaseAdmin;
    constructor(prisma, supabaseAdmin) {
        this.prisma = prisma;
        this.supabaseAdmin = supabaseAdmin;
    }
    toPublicRow(p) {
        return {
            id: p.id,
            name: p.name,
            email: p.email,
            role: p.role,
            status: p.status,
            lastLogin: p.lastLogin?.toISOString(),
            companyId: p.companyId ?? null,
        };
    }
    async getMe(id) {
        const profile = await this.prisma.profile.findUnique({ where: { id } });
        const userEmail = profile?.email ?? `${id}@users.local`;
        const userName = profile?.name ?? userEmail;
        const userCount = await this.prisma.user.count();
        const roleId = userCount === 0 ? 1 : 2;
        const user = await this.prisma.user.upsert({
            where: { id },
            update: {
                lastLogin: new Date(),
            },
            create: {
                id,
                email: userEmail,
                name: userName || userEmail,
                roleId,
                status: 'Active',
                updatedAt: new Date(),
            },
            include: { Role: true },
        });
        const role = profile?.role ?? 'user';
        return {
            success: true,
            user: this.toPublicRow({
                id: user.id,
                name: user.name,
                email: user.email,
                role,
                status: user.status,
                lastLogin: user.lastLogin ?? null,
                companyId: profile?.companyId ?? null,
            }),
        };
    }
    findById(id) {
        return this.prisma.profile.findUnique({ where: { id } });
    }
    list(companyId) {
        return this.prisma.profile.findMany({
            where: { companyId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(dto, companyId) {
        const { data, error } = await this.supabaseAdmin.auth.admin.createUser({
            email: dto.email,
            password: dto.password,
            email_confirm: true,
            user_metadata: { full_name: dto.name, name: dto.name },
        });
        if (error || !data.user) {
            throw new common_1.BadRequestException(error?.message ?? 'Failed to create auth user');
        }
        const uid = data.user.id;
        try {
            const row = await this.prisma.profile.create({
                data: {
                    id: uid,
                    email: dto.email,
                    name: dto.name,
                    role: dto.role,
                    status: dto.status,
                    companyId,
                    updatedAt: new Date(),
                },
            });
            return row;
        }
        catch (e) {
            await this.supabaseAdmin.auth.admin.deleteUser(uid);
            throw e;
        }
    }
    async update(id, dto, companyId) {
        const existing = await this.prisma.profile.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('User not found');
        if (existing.companyId !== companyId)
            throw new common_1.NotFoundException('User not found');
        return this.prisma.profile.update({
            where: { id },
            data: {
                ...(dto.name != null ? { name: dto.name } : {}),
                ...(dto.role != null ? { role: dto.role } : {}),
                ...(dto.status != null ? { status: dto.status } : {}),
            },
        });
    }
    async remove(id, companyId) {
        const existing = await this.prisma.profile.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('User not found');
        if (existing.companyId !== companyId)
            throw new common_1.NotFoundException('User not found');
        await this.prisma.transaction.deleteMany({
            where: { profileId: id, companyId },
        });
        await this.prisma.profile.delete({ where: { id } });
        const { error } = await this.supabaseAdmin.auth.admin.deleteUser(id);
        if (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(supabase_module_1.SUPABASE_ADMIN)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_js_1.SupabaseClient])
], UsersService);
//# sourceMappingURL=users.service.js.map