export declare class ListProductsQuery {
    search?: string;
    category?: string;
    status?: 'Published' | 'Draft';
    stockStatus?: 'inStock' | 'lowStock' | 'critical';
    page: number;
    pageSize: number;
}
