import { TransactionType } from '@prisma/client';
export declare class ListTransactionsQuery {
    type?: TransactionType;
    productId?: string;
    search?: string;
    from?: string;
    to?: string;
    page: number;
    pageSize: number;
}
