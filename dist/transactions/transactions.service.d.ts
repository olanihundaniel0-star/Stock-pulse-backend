import { PrismaService } from '../prisma/prisma.service';
import { StockOutReason, TransactionType } from '@prisma/client';
export declare class TransactionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(params: {
        type?: TransactionType;
        productId?: string;
        search?: string;
        from?: string;
        to?: string;
        companyId: string;
        page: number;
        pageSize: number;
    }): Promise<{
        total: number;
        items: ({
            Profile: {
                role: string;
                name: string;
                email: string;
                id: string;
                status: string;
                companyId: string | null;
                lastLogin: Date | null;
                createdAt: Date;
                updatedAt: Date;
            };
            Product: {
                name: string;
                id: string;
                status: import("@prisma/client").$Enums.ProductStatus;
                companyId: string;
                createdAt: Date;
                updatedAt: Date;
                category: string;
                description: string | null;
                supplierName: string;
                sku: string;
                image: string | null;
                costPrice: import("@prisma/client-runtime-utils").Decimal;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                quantity: number;
                reorderLevel: number;
                supplierContact: string | null;
                location: string | null;
                unit: string;
            };
        } & {
            id: string;
            companyId: string;
            createdAt: Date;
            quantity: number;
            type: import("@prisma/client").$Enums.TransactionType;
            productId: string;
            date: Date;
            unitPrice: import("@prisma/client-runtime-utils").Decimal | null;
            unitCost: import("@prisma/client-runtime-utils").Decimal | null;
            reason: import("@prisma/client").$Enums.StockOutReason | null;
            customer: string | null;
            supplier: string | null;
            notes: string | null;
            profileId: string;
        })[];
    }>;
    create(input: {
        profileId: string;
        productId: string;
        companyId: string;
        type: TransactionType;
        quantity: number;
        reason?: StockOutReason;
        unitPrice?: number;
        unitCost?: number;
        customer?: string;
        supplier?: string;
        notes?: string;
        date?: string;
    }): Promise<{
        Profile: {
            role: string;
            name: string;
            email: string;
            id: string;
            status: string;
            companyId: string | null;
            lastLogin: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        Product: {
            name: string;
            id: string;
            status: import("@prisma/client").$Enums.ProductStatus;
            companyId: string;
            createdAt: Date;
            updatedAt: Date;
            category: string;
            description: string | null;
            supplierName: string;
            sku: string;
            image: string | null;
            costPrice: import("@prisma/client-runtime-utils").Decimal;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            reorderLevel: number;
            supplierContact: string | null;
            location: string | null;
            unit: string;
        };
    } & {
        id: string;
        companyId: string;
        createdAt: Date;
        quantity: number;
        type: import("@prisma/client").$Enums.TransactionType;
        productId: string;
        date: Date;
        unitPrice: import("@prisma/client-runtime-utils").Decimal | null;
        unitCost: import("@prisma/client-runtime-utils").Decimal | null;
        reason: import("@prisma/client").$Enums.StockOutReason | null;
        customer: string | null;
        supplier: string | null;
        notes: string | null;
        profileId: string;
    }>;
}
