import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ListTransactionsQuery } from './dto/list-transactions.query';
import { TransactionsService } from './transactions.service';
type AuthenticatedRequest = {
    user: {
        userId: string;
        companyId: string | null;
    };
};
export declare class TransactionsController {
    private readonly tx;
    constructor(tx: TransactionsService);
    private requireCompanyId;
    list(req: AuthenticatedRequest, q: ListTransactionsQuery): Promise<{
        total: number;
        items: {
            id: string;
            productId: string;
            productName: string;
            type: import("@prisma/client").$Enums.TransactionType;
            quantity: number;
            unitPrice: number | undefined;
            unitCost: number | undefined;
            reason: import("@prisma/client").$Enums.StockOutReason | undefined;
            customer: string | undefined;
            supplier: string | undefined;
            notes: string | undefined;
            date: string;
            userId: string;
            userName: string;
        }[];
    }>;
    create(req: AuthenticatedRequest, body: CreateTransactionDto): Promise<{
        id: string;
        productId: string;
        productName: string;
        type: import("@prisma/client").$Enums.TransactionType;
        quantity: number;
        unitPrice: number | undefined;
        unitCost: number | undefined;
        reason: import("@prisma/client").$Enums.StockOutReason | undefined;
        customer: string | undefined;
        supplier: string | undefined;
        notes: string | undefined;
        date: string;
        userId: string;
        userName: string;
    }>;
}
export {};
