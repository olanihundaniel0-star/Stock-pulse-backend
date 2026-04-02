import { ListProductsQuery } from './dto/list-products.query';
import { UpsertProductDto } from './dto/upsert-product.dto';
import { ProductsService } from './products.service';
type AuthenticatedRequest = {
    user: {
        companyId: string | null;
    };
};
export declare class ProductsController {
    private readonly products;
    constructor(products: ProductsService);
    private requireCompanyId;
    list(req: AuthenticatedRequest, q: ListProductsQuery): Promise<{
        total: number;
        items: {
            costPrice: number;
            sellingPrice: number;
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
            quantity: number;
            reorderLevel: number;
            supplierContact: string | null;
            location: string | null;
            unit: string;
        }[];
    }>;
    get(req: AuthenticatedRequest, id: string): Promise<{
        costPrice: number;
        sellingPrice: number;
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
        quantity: number;
        reorderLevel: number;
        supplierContact: string | null;
        location: string | null;
        unit: string;
    }>;
    create(req: AuthenticatedRequest, dto: UpsertProductDto): Promise<{
        costPrice: number;
        sellingPrice: number;
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
        quantity: number;
        reorderLevel: number;
        supplierContact: string | null;
        location: string | null;
        unit: string;
    }>;
    update(req: AuthenticatedRequest, id: string, dto: UpsertProductDto): Promise<{
        costPrice: number;
        sellingPrice: number;
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
        quantity: number;
        reorderLevel: number;
        supplierContact: string | null;
        location: string | null;
        unit: string;
    }>;
    remove(req: AuthenticatedRequest, id: string): Promise<{
        ok: boolean;
    }>;
}
export {};
