import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TransactionModel = runtime.Types.Result.DefaultSelection<Prisma.$TransactionPayload>;
export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null;
    _avg: TransactionAvgAggregateOutputType | null;
    _sum: TransactionSumAggregateOutputType | null;
    _min: TransactionMinAggregateOutputType | null;
    _max: TransactionMaxAggregateOutputType | null;
};
export type TransactionAvgAggregateOutputType = {
    quantity: number | null;
    unitPrice: runtime.Decimal | null;
    unitCost: runtime.Decimal | null;
};
export type TransactionSumAggregateOutputType = {
    quantity: number | null;
    unitPrice: runtime.Decimal | null;
    unitCost: runtime.Decimal | null;
};
export type TransactionMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    type: $Enums.TransactionType | null;
    quantity: number | null;
    unitPrice: runtime.Decimal | null;
    unitCost: runtime.Decimal | null;
    reason: $Enums.StockOutReason | null;
    customer: string | null;
    supplier: string | null;
    notes: string | null;
    date: Date | null;
    userId: string | null;
    createdAt: Date | null;
};
export type TransactionMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    type: $Enums.TransactionType | null;
    quantity: number | null;
    unitPrice: runtime.Decimal | null;
    unitCost: runtime.Decimal | null;
    reason: $Enums.StockOutReason | null;
    customer: string | null;
    supplier: string | null;
    notes: string | null;
    date: Date | null;
    userId: string | null;
    createdAt: Date | null;
};
export type TransactionCountAggregateOutputType = {
    id: number;
    productId: number;
    type: number;
    quantity: number;
    unitPrice: number;
    unitCost: number;
    reason: number;
    customer: number;
    supplier: number;
    notes: number;
    date: number;
    userId: number;
    createdAt: number;
    _all: number;
};
export type TransactionAvgAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
    unitCost?: true;
};
export type TransactionSumAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
    unitCost?: true;
};
export type TransactionMinAggregateInputType = {
    id?: true;
    productId?: true;
    type?: true;
    quantity?: true;
    unitPrice?: true;
    unitCost?: true;
    reason?: true;
    customer?: true;
    supplier?: true;
    notes?: true;
    date?: true;
    userId?: true;
    createdAt?: true;
};
export type TransactionMaxAggregateInputType = {
    id?: true;
    productId?: true;
    type?: true;
    quantity?: true;
    unitPrice?: true;
    unitCost?: true;
    reason?: true;
    customer?: true;
    supplier?: true;
    notes?: true;
    date?: true;
    userId?: true;
    createdAt?: true;
};
export type TransactionCountAggregateInputType = {
    id?: true;
    productId?: true;
    type?: true;
    quantity?: true;
    unitPrice?: true;
    unitCost?: true;
    reason?: true;
    customer?: true;
    supplier?: true;
    notes?: true;
    date?: true;
    userId?: true;
    createdAt?: true;
    _all?: true;
};
export type TransactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput | Prisma.TransactionOrderByWithRelationInput[];
    cursor?: Prisma.TransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TransactionCountAggregateInputType;
    _avg?: TransactionAvgAggregateInputType;
    _sum?: TransactionSumAggregateInputType;
    _min?: TransactionMinAggregateInputType;
    _max?: TransactionMaxAggregateInputType;
};
export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
    [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTransaction[P]> : Prisma.GetScalarType<T[P], AggregateTransaction[P]>;
};
export type TransactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithAggregationInput | Prisma.TransactionOrderByWithAggregationInput[];
    by: Prisma.TransactionScalarFieldEnum[] | Prisma.TransactionScalarFieldEnum;
    having?: Prisma.TransactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TransactionCountAggregateInputType | true;
    _avg?: TransactionAvgAggregateInputType;
    _sum?: TransactionSumAggregateInputType;
    _min?: TransactionMinAggregateInputType;
    _max?: TransactionMaxAggregateInputType;
};
export type TransactionGroupByOutputType = {
    id: string;
    productId: string;
    type: $Enums.TransactionType;
    quantity: number;
    unitPrice: runtime.Decimal | null;
    unitCost: runtime.Decimal | null;
    reason: $Enums.StockOutReason | null;
    customer: string | null;
    supplier: string | null;
    notes: string | null;
    date: Date;
    userId: string;
    createdAt: Date;
    _count: TransactionCountAggregateOutputType | null;
    _avg: TransactionAvgAggregateOutputType | null;
    _sum: TransactionSumAggregateOutputType | null;
    _min: TransactionMinAggregateOutputType | null;
    _max: TransactionMaxAggregateOutputType | null;
};
type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TransactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TransactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TransactionGroupByOutputType[P]>;
}>>;
export type TransactionWhereInput = {
    AND?: Prisma.TransactionWhereInput | Prisma.TransactionWhereInput[];
    OR?: Prisma.TransactionWhereInput[];
    NOT?: Prisma.TransactionWhereInput | Prisma.TransactionWhereInput[];
    id?: Prisma.StringFilter<"Transaction"> | string;
    productId?: Prisma.StringFilter<"Transaction"> | string;
    type?: Prisma.EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType;
    quantity?: Prisma.IntFilter<"Transaction"> | number;
    unitPrice?: Prisma.DecimalNullableFilter<"Transaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: Prisma.DecimalNullableFilter<"Transaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: Prisma.EnumStockOutReasonNullableFilter<"Transaction"> | $Enums.StockOutReason | null;
    customer?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    supplier?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    notes?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    date?: Prisma.DateTimeFilter<"Transaction"> | Date | string;
    userId?: Prisma.StringFilter<"Transaction"> | string;
    createdAt?: Prisma.DateTimeFilter<"Transaction"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type TransactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    unitCost?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    customer?: Prisma.SortOrderInput | Prisma.SortOrder;
    supplier?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    date?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TransactionWhereInput | Prisma.TransactionWhereInput[];
    OR?: Prisma.TransactionWhereInput[];
    NOT?: Prisma.TransactionWhereInput | Prisma.TransactionWhereInput[];
    productId?: Prisma.StringFilter<"Transaction"> | string;
    type?: Prisma.EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType;
    quantity?: Prisma.IntFilter<"Transaction"> | number;
    unitPrice?: Prisma.DecimalNullableFilter<"Transaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: Prisma.DecimalNullableFilter<"Transaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: Prisma.EnumStockOutReasonNullableFilter<"Transaction"> | $Enums.StockOutReason | null;
    customer?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    supplier?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    notes?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    date?: Prisma.DateTimeFilter<"Transaction"> | Date | string;
    userId?: Prisma.StringFilter<"Transaction"> | string;
    createdAt?: Prisma.DateTimeFilter<"Transaction"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type TransactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    unitCost?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    customer?: Prisma.SortOrderInput | Prisma.SortOrder;
    supplier?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    date?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.TransactionCountOrderByAggregateInput;
    _avg?: Prisma.TransactionAvgOrderByAggregateInput;
    _max?: Prisma.TransactionMaxOrderByAggregateInput;
    _min?: Prisma.TransactionMinOrderByAggregateInput;
    _sum?: Prisma.TransactionSumOrderByAggregateInput;
};
export type TransactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.TransactionScalarWhereWithAggregatesInput | Prisma.TransactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.TransactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TransactionScalarWhereWithAggregatesInput | Prisma.TransactionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Transaction"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"Transaction"> | string;
    type?: Prisma.EnumTransactionTypeWithAggregatesFilter<"Transaction"> | $Enums.TransactionType;
    quantity?: Prisma.IntWithAggregatesFilter<"Transaction"> | number;
    unitPrice?: Prisma.DecimalNullableWithAggregatesFilter<"Transaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: Prisma.DecimalNullableWithAggregatesFilter<"Transaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: Prisma.EnumStockOutReasonNullableWithAggregatesFilter<"Transaction"> | $Enums.StockOutReason | null;
    customer?: Prisma.StringNullableWithAggregatesFilter<"Transaction"> | string | null;
    supplier?: Prisma.StringNullableWithAggregatesFilter<"Transaction"> | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"Transaction"> | string | null;
    date?: Prisma.DateTimeWithAggregatesFilter<"Transaction"> | Date | string;
    userId?: Prisma.StringWithAggregatesFilter<"Transaction"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Transaction"> | Date | string;
};
export type TransactionCreateInput = {
    id?: string;
    type: $Enums.TransactionType;
    quantity: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: $Enums.StockOutReason | null;
    customer?: string | null;
    supplier?: string | null;
    notes?: string | null;
    date?: Date | string;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutTransactionsInput;
    user: Prisma.UserCreateNestedOneWithoutTransactionsInput;
};
export type TransactionUncheckedCreateInput = {
    id?: string;
    productId: string;
    type: $Enums.TransactionType;
    quantity: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: $Enums.StockOutReason | null;
    customer?: string | null;
    supplier?: string | null;
    notes?: string | null;
    date?: Date | string;
    userId: string;
    createdAt?: Date | string;
};
export type TransactionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: Prisma.NullableEnumStockOutReasonFieldUpdateOperationsInput | $Enums.StockOutReason | null;
    customer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutTransactionsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutTransactionsNestedInput;
};
export type TransactionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: Prisma.NullableEnumStockOutReasonFieldUpdateOperationsInput | $Enums.StockOutReason | null;
    customer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TransactionCreateManyInput = {
    id?: string;
    productId: string;
    type: $Enums.TransactionType;
    quantity: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: $Enums.StockOutReason | null;
    customer?: string | null;
    supplier?: string | null;
    notes?: string | null;
    date?: Date | string;
    userId: string;
    createdAt?: Date | string;
};
export type TransactionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: Prisma.NullableEnumStockOutReasonFieldUpdateOperationsInput | $Enums.StockOutReason | null;
    customer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TransactionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: Prisma.NullableEnumStockOutReasonFieldUpdateOperationsInput | $Enums.StockOutReason | null;
    customer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TransactionListRelationFilter = {
    every?: Prisma.TransactionWhereInput;
    some?: Prisma.TransactionWhereInput;
    none?: Prisma.TransactionWhereInput;
};
export type TransactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TransactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    unitCost?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    customer?: Prisma.SortOrder;
    supplier?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TransactionAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    unitCost?: Prisma.SortOrder;
};
export type TransactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    unitCost?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    customer?: Prisma.SortOrder;
    supplier?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TransactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    unitCost?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    customer?: Prisma.SortOrder;
    supplier?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TransactionSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    unitCost?: Prisma.SortOrder;
};
export type TransactionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutUserInput, Prisma.TransactionUncheckedCreateWithoutUserInput> | Prisma.TransactionCreateWithoutUserInput[] | Prisma.TransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutUserInput | Prisma.TransactionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TransactionCreateManyUserInputEnvelope;
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
};
export type TransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutUserInput, Prisma.TransactionUncheckedCreateWithoutUserInput> | Prisma.TransactionCreateWithoutUserInput[] | Prisma.TransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutUserInput | Prisma.TransactionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TransactionCreateManyUserInputEnvelope;
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
};
export type TransactionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutUserInput, Prisma.TransactionUncheckedCreateWithoutUserInput> | Prisma.TransactionCreateWithoutUserInput[] | Prisma.TransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutUserInput | Prisma.TransactionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TransactionUpsertWithWhereUniqueWithoutUserInput | Prisma.TransactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TransactionCreateManyUserInputEnvelope;
    set?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    disconnect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    delete?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    update?: Prisma.TransactionUpdateWithWhereUniqueWithoutUserInput | Prisma.TransactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TransactionUpdateManyWithWhereWithoutUserInput | Prisma.TransactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TransactionScalarWhereInput | Prisma.TransactionScalarWhereInput[];
};
export type TransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutUserInput, Prisma.TransactionUncheckedCreateWithoutUserInput> | Prisma.TransactionCreateWithoutUserInput[] | Prisma.TransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutUserInput | Prisma.TransactionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TransactionUpsertWithWhereUniqueWithoutUserInput | Prisma.TransactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TransactionCreateManyUserInputEnvelope;
    set?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    disconnect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    delete?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    update?: Prisma.TransactionUpdateWithWhereUniqueWithoutUserInput | Prisma.TransactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TransactionUpdateManyWithWhereWithoutUserInput | Prisma.TransactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TransactionScalarWhereInput | Prisma.TransactionScalarWhereInput[];
};
export type TransactionCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutProductInput, Prisma.TransactionUncheckedCreateWithoutProductInput> | Prisma.TransactionCreateWithoutProductInput[] | Prisma.TransactionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutProductInput | Prisma.TransactionCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.TransactionCreateManyProductInputEnvelope;
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
};
export type TransactionUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutProductInput, Prisma.TransactionUncheckedCreateWithoutProductInput> | Prisma.TransactionCreateWithoutProductInput[] | Prisma.TransactionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutProductInput | Prisma.TransactionCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.TransactionCreateManyProductInputEnvelope;
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
};
export type TransactionUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutProductInput, Prisma.TransactionUncheckedCreateWithoutProductInput> | Prisma.TransactionCreateWithoutProductInput[] | Prisma.TransactionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutProductInput | Prisma.TransactionCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.TransactionUpsertWithWhereUniqueWithoutProductInput | Prisma.TransactionUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.TransactionCreateManyProductInputEnvelope;
    set?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    disconnect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    delete?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    update?: Prisma.TransactionUpdateWithWhereUniqueWithoutProductInput | Prisma.TransactionUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.TransactionUpdateManyWithWhereWithoutProductInput | Prisma.TransactionUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.TransactionScalarWhereInput | Prisma.TransactionScalarWhereInput[];
};
export type TransactionUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutProductInput, Prisma.TransactionUncheckedCreateWithoutProductInput> | Prisma.TransactionCreateWithoutProductInput[] | Prisma.TransactionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutProductInput | Prisma.TransactionCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.TransactionUpsertWithWhereUniqueWithoutProductInput | Prisma.TransactionUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.TransactionCreateManyProductInputEnvelope;
    set?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    disconnect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    delete?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    update?: Prisma.TransactionUpdateWithWhereUniqueWithoutProductInput | Prisma.TransactionUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.TransactionUpdateManyWithWhereWithoutProductInput | Prisma.TransactionUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.TransactionScalarWhereInput | Prisma.TransactionScalarWhereInput[];
};
export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType;
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type NullableEnumStockOutReasonFieldUpdateOperationsInput = {
    set?: $Enums.StockOutReason | null;
};
export type TransactionCreateWithoutUserInput = {
    id?: string;
    type: $Enums.TransactionType;
    quantity: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: $Enums.StockOutReason | null;
    customer?: string | null;
    supplier?: string | null;
    notes?: string | null;
    date?: Date | string;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutTransactionsInput;
};
export type TransactionUncheckedCreateWithoutUserInput = {
    id?: string;
    productId: string;
    type: $Enums.TransactionType;
    quantity: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: $Enums.StockOutReason | null;
    customer?: string | null;
    supplier?: string | null;
    notes?: string | null;
    date?: Date | string;
    createdAt?: Date | string;
};
export type TransactionCreateOrConnectWithoutUserInput = {
    where: Prisma.TransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.TransactionCreateWithoutUserInput, Prisma.TransactionUncheckedCreateWithoutUserInput>;
};
export type TransactionCreateManyUserInputEnvelope = {
    data: Prisma.TransactionCreateManyUserInput | Prisma.TransactionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type TransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.TransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.TransactionUpdateWithoutUserInput, Prisma.TransactionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.TransactionCreateWithoutUserInput, Prisma.TransactionUncheckedCreateWithoutUserInput>;
};
export type TransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.TransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.TransactionUpdateWithoutUserInput, Prisma.TransactionUncheckedUpdateWithoutUserInput>;
};
export type TransactionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.TransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.TransactionUpdateManyMutationInput, Prisma.TransactionUncheckedUpdateManyWithoutUserInput>;
};
export type TransactionScalarWhereInput = {
    AND?: Prisma.TransactionScalarWhereInput | Prisma.TransactionScalarWhereInput[];
    OR?: Prisma.TransactionScalarWhereInput[];
    NOT?: Prisma.TransactionScalarWhereInput | Prisma.TransactionScalarWhereInput[];
    id?: Prisma.StringFilter<"Transaction"> | string;
    productId?: Prisma.StringFilter<"Transaction"> | string;
    type?: Prisma.EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType;
    quantity?: Prisma.IntFilter<"Transaction"> | number;
    unitPrice?: Prisma.DecimalNullableFilter<"Transaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: Prisma.DecimalNullableFilter<"Transaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: Prisma.EnumStockOutReasonNullableFilter<"Transaction"> | $Enums.StockOutReason | null;
    customer?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    supplier?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    notes?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    date?: Prisma.DateTimeFilter<"Transaction"> | Date | string;
    userId?: Prisma.StringFilter<"Transaction"> | string;
    createdAt?: Prisma.DateTimeFilter<"Transaction"> | Date | string;
};
export type TransactionCreateWithoutProductInput = {
    id?: string;
    type: $Enums.TransactionType;
    quantity: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: $Enums.StockOutReason | null;
    customer?: string | null;
    supplier?: string | null;
    notes?: string | null;
    date?: Date | string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutTransactionsInput;
};
export type TransactionUncheckedCreateWithoutProductInput = {
    id?: string;
    type: $Enums.TransactionType;
    quantity: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: $Enums.StockOutReason | null;
    customer?: string | null;
    supplier?: string | null;
    notes?: string | null;
    date?: Date | string;
    userId: string;
    createdAt?: Date | string;
};
export type TransactionCreateOrConnectWithoutProductInput = {
    where: Prisma.TransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.TransactionCreateWithoutProductInput, Prisma.TransactionUncheckedCreateWithoutProductInput>;
};
export type TransactionCreateManyProductInputEnvelope = {
    data: Prisma.TransactionCreateManyProductInput | Prisma.TransactionCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type TransactionUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.TransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.TransactionUpdateWithoutProductInput, Prisma.TransactionUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.TransactionCreateWithoutProductInput, Prisma.TransactionUncheckedCreateWithoutProductInput>;
};
export type TransactionUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.TransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.TransactionUpdateWithoutProductInput, Prisma.TransactionUncheckedUpdateWithoutProductInput>;
};
export type TransactionUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.TransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.TransactionUpdateManyMutationInput, Prisma.TransactionUncheckedUpdateManyWithoutProductInput>;
};
export type TransactionCreateManyUserInput = {
    id?: string;
    productId: string;
    type: $Enums.TransactionType;
    quantity: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: $Enums.StockOutReason | null;
    customer?: string | null;
    supplier?: string | null;
    notes?: string | null;
    date?: Date | string;
    createdAt?: Date | string;
};
export type TransactionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: Prisma.NullableEnumStockOutReasonFieldUpdateOperationsInput | $Enums.StockOutReason | null;
    customer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutTransactionsNestedInput;
};
export type TransactionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: Prisma.NullableEnumStockOutReasonFieldUpdateOperationsInput | $Enums.StockOutReason | null;
    customer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TransactionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: Prisma.NullableEnumStockOutReasonFieldUpdateOperationsInput | $Enums.StockOutReason | null;
    customer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TransactionCreateManyProductInput = {
    id?: string;
    type: $Enums.TransactionType;
    quantity: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: $Enums.StockOutReason | null;
    customer?: string | null;
    supplier?: string | null;
    notes?: string | null;
    date?: Date | string;
    userId: string;
    createdAt?: Date | string;
};
export type TransactionUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: Prisma.NullableEnumStockOutReasonFieldUpdateOperationsInput | $Enums.StockOutReason | null;
    customer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutTransactionsNestedInput;
};
export type TransactionUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: Prisma.NullableEnumStockOutReasonFieldUpdateOperationsInput | $Enums.StockOutReason | null;
    customer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TransactionUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    unitCost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    reason?: Prisma.NullableEnumStockOutReasonFieldUpdateOperationsInput | $Enums.StockOutReason | null;
    customer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TransactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    type?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    unitCost?: boolean;
    reason?: boolean;
    customer?: boolean;
    supplier?: boolean;
    notes?: boolean;
    date?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["transaction"]>;
export type TransactionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    type?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    unitCost?: boolean;
    reason?: boolean;
    customer?: boolean;
    supplier?: boolean;
    notes?: boolean;
    date?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["transaction"]>;
export type TransactionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    type?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    unitCost?: boolean;
    reason?: boolean;
    customer?: boolean;
    supplier?: boolean;
    notes?: boolean;
    date?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["transaction"]>;
export type TransactionSelectScalar = {
    id?: boolean;
    productId?: boolean;
    type?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    unitCost?: boolean;
    reason?: boolean;
    customer?: boolean;
    supplier?: boolean;
    notes?: boolean;
    date?: boolean;
    userId?: boolean;
    createdAt?: boolean;
};
export type TransactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "productId" | "type" | "quantity" | "unitPrice" | "unitCost" | "reason" | "customer" | "supplier" | "notes" | "date" | "userId" | "createdAt", ExtArgs["result"]["transaction"]>;
export type TransactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TransactionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $TransactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Transaction";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        productId: string;
        type: $Enums.TransactionType;
        quantity: number;
        unitPrice: runtime.Decimal | null;
        unitCost: runtime.Decimal | null;
        reason: $Enums.StockOutReason | null;
        customer: string | null;
        supplier: string | null;
        notes: string | null;
        date: Date;
        userId: string;
        createdAt: Date;
    }, ExtArgs["result"]["transaction"]>;
    composites: {};
};
export type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TransactionPayload, S>;
export type TransactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TransactionCountAggregateInputType | true;
};
export interface TransactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Transaction'];
        meta: {
            name: 'Transaction';
        };
    };
    findUnique<T extends TransactionFindUniqueArgs>(args: Prisma.SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TransactionFindFirstArgs>(args?: Prisma.SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TransactionFindManyArgs>(args?: Prisma.SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TransactionCreateArgs>(args: Prisma.SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TransactionCreateManyArgs>(args?: Prisma.SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TransactionDeleteArgs>(args: Prisma.SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TransactionUpdateArgs>(args: Prisma.SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TransactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TransactionUpdateManyArgs>(args: Prisma.SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TransactionUpsertArgs>(args: Prisma.SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TransactionCountArgs>(args?: Prisma.Subset<T, TransactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TransactionCountAggregateOutputType> : number>;
    aggregate<T extends TransactionAggregateArgs>(args: Prisma.Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>;
    groupBy<T extends TransactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TransactionGroupByArgs['orderBy'];
    } : {
        orderBy?: TransactionGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TransactionFieldRefs;
}
export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TransactionFieldRefs {
    readonly id: Prisma.FieldRef<"Transaction", 'String'>;
    readonly productId: Prisma.FieldRef<"Transaction", 'String'>;
    readonly type: Prisma.FieldRef<"Transaction", 'TransactionType'>;
    readonly quantity: Prisma.FieldRef<"Transaction", 'Int'>;
    readonly unitPrice: Prisma.FieldRef<"Transaction", 'Decimal'>;
    readonly unitCost: Prisma.FieldRef<"Transaction", 'Decimal'>;
    readonly reason: Prisma.FieldRef<"Transaction", 'StockOutReason'>;
    readonly customer: Prisma.FieldRef<"Transaction", 'String'>;
    readonly supplier: Prisma.FieldRef<"Transaction", 'String'>;
    readonly notes: Prisma.FieldRef<"Transaction", 'String'>;
    readonly date: Prisma.FieldRef<"Transaction", 'DateTime'>;
    readonly userId: Prisma.FieldRef<"Transaction", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Transaction", 'DateTime'>;
}
export type TransactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where: Prisma.TransactionWhereUniqueInput;
};
export type TransactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where: Prisma.TransactionWhereUniqueInput;
};
export type TransactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput | Prisma.TransactionOrderByWithRelationInput[];
    cursor?: Prisma.TransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TransactionScalarFieldEnum | Prisma.TransactionScalarFieldEnum[];
};
export type TransactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput | Prisma.TransactionOrderByWithRelationInput[];
    cursor?: Prisma.TransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TransactionScalarFieldEnum | Prisma.TransactionScalarFieldEnum[];
};
export type TransactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput | Prisma.TransactionOrderByWithRelationInput[];
    cursor?: Prisma.TransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TransactionScalarFieldEnum | Prisma.TransactionScalarFieldEnum[];
};
export type TransactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TransactionCreateInput, Prisma.TransactionUncheckedCreateInput>;
};
export type TransactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TransactionCreateManyInput | Prisma.TransactionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TransactionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    data: Prisma.TransactionCreateManyInput | Prisma.TransactionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TransactionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TransactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TransactionUpdateInput, Prisma.TransactionUncheckedUpdateInput>;
    where: Prisma.TransactionWhereUniqueInput;
};
export type TransactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TransactionUpdateManyMutationInput, Prisma.TransactionUncheckedUpdateManyInput>;
    where?: Prisma.TransactionWhereInput;
    limit?: number;
};
export type TransactionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TransactionUpdateManyMutationInput, Prisma.TransactionUncheckedUpdateManyInput>;
    where?: Prisma.TransactionWhereInput;
    limit?: number;
    include?: Prisma.TransactionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TransactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where: Prisma.TransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.TransactionCreateInput, Prisma.TransactionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TransactionUpdateInput, Prisma.TransactionUncheckedUpdateInput>;
};
export type TransactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where: Prisma.TransactionWhereUniqueInput;
};
export type TransactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
    limit?: number;
};
export type TransactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
};
export {};
