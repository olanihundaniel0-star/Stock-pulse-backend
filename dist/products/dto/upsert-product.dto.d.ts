export declare class UpsertProductDto {
    name: string;
    sku: string;
    category: string;
    description?: string;
    image?: string;
    costPrice: number;
    sellingPrice: number;
    quantity: number;
    reorderLevel: number;
    supplierName: string;
    supplierContact?: string;
    location?: string;
    unit: string;
    status: 'Published' | 'Draft';
}
