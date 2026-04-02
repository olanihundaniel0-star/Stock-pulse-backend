import { SupabaseClient } from '@supabase/supabase-js';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    private readonly supabaseAdmin;
    constructor(prisma: PrismaService, supabaseAdmin: SupabaseClient);
    toPublicRow(p: {
        id: string;
        name: string;
        email: string;
        role: string;
        status: string;
        lastLogin: Date | null;
        companyId?: string | null;
    }): {
        id: string;
        name: string;
        email: string;
        role: string;
        status: string;
        lastLogin: string | undefined;
        companyId: string | null;
    };
    getMe(id: string): Promise<{
        success: boolean;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            status: string;
            lastLogin: string | undefined;
            companyId: string | null;
        };
    }>;
    findById(id: string): import("@prisma/client").Prisma.Prisma__ProfileClient<{
        role: string;
        name: string;
        email: string;
        id: string;
        status: string;
        companyId: string | null;
        lastLogin: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import(".prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    list(companyId: string): import("@prisma/client").Prisma.PrismaPromise<{
        role: string;
        name: string;
        email: string;
        id: string;
        status: string;
        companyId: string | null;
        lastLogin: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(dto: CreateUserDto, companyId: string): Promise<{
        role: string;
        name: string;
        email: string;
        id: string;
        status: string;
        companyId: string | null;
        lastLogin: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateUserDto, companyId: string): Promise<{
        role: string;
        name: string;
        email: string;
        id: string;
        status: string;
        companyId: string | null;
        lastLogin: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, companyId: string): Promise<void>;
}
