import { StockOutReason, TransactionType } from '@prisma/client';
export declare class CreateTransactionDto {
    productId: string;
    type: TransactionType;
    quantity: number;
    reason?: StockOutReason;
    unitPrice?: number;
    unitCost?: number;
    customer?: string;
    supplier?: string;
    notes?: string;
    date?: string;
}
