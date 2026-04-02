import { CanActivate, ExecutionContext } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { PrismaService } from '../prisma/prisma.service';
export declare class SupabaseAuthGuard implements CanActivate {
    private readonly supabase;
    private readonly prisma;
    constructor(supabase: SupabaseClient, prisma: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
