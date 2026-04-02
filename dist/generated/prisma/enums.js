"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStatus = exports.StockOutReason = exports.TransactionType = exports.UserRole = void 0;
exports.UserRole = {
    ADMIN: 'ADMIN',
    STAFF: 'STAFF'
};
exports.TransactionType = {
    STOCK_IN: 'STOCK_IN',
    STOCK_OUT: 'STOCK_OUT'
};
exports.StockOutReason = {
    Sale: 'Sale',
    Damaged: 'Damaged',
    Expired: 'Expired',
    Theft_Loss: 'Theft_Loss',
    Sample_Giveaway: 'Sample_Giveaway',
    Internal_Use: 'Internal_Use'
};
exports.ProductStatus = {
    Published: 'Published',
    Draft: 'Draft'
};
//# sourceMappingURL=enums.js.map