export declare const UserRole: {
    readonly ADMIN: "ADMIN";
    readonly STAFF: "STAFF";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const TransactionType: {
    readonly STOCK_IN: "STOCK_IN";
    readonly STOCK_OUT: "STOCK_OUT";
};
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
export declare const StockOutReason: {
    readonly Sale: "Sale";
    readonly Damaged: "Damaged";
    readonly Expired: "Expired";
    readonly Theft_Loss: "Theft_Loss";
    readonly Sample_Giveaway: "Sample_Giveaway";
    readonly Internal_Use: "Internal_Use";
};
export type StockOutReason = (typeof StockOutReason)[keyof typeof StockOutReason];
export declare const ProductStatus: {
    readonly Published: "Published";
    readonly Draft: "Draft";
};
export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];
