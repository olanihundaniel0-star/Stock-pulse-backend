import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { StockOutReason, TransactionType } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(params: {
    type?: TransactionType;
    productId?: string;
    search?: string;
    from?: string;
    to?: string;
    companyId: string;
    page: number;
    pageSize: number;
  }) {
    const where: Record<string, unknown> = { companyId: params.companyId };
    if (params.type) where.type = params.type;
    if (params.productId) where.productId = params.productId;

    if (params.from || params.to) {
      where.date = {};
      if (params.from)
        (where.date as Record<string, Date>).gte = new Date(params.from);
      if (params.to)
        (where.date as Record<string, Date>).lte = new Date(params.to);
    }

    if (params.search) {
      where.OR = [
        { Product: { name: { contains: params.search, mode: 'insensitive' } } },
        { Profile: { name: { contains: params.search, mode: 'insensitive' } } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.transaction.count({ where }),
      this.prisma.transaction.findMany({
        where,
        include: { Product: true, Profile: true },
        orderBy: { date: 'desc' },
        skip: (params.page - 1) * params.pageSize,
        take: params.pageSize,
      }),
    ]);

    return { total, items };
  }

  async create(input: {
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
  }) {
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.findFirst({
        where: { id: input.productId, companyId: input.companyId },
      });
      if (!product) throw new NotFoundException('Product not found');

      const quantityBefore = product.quantity;

      if (input.type === TransactionType.STOCK_OUT) {
        // Atomic conditional decrement: guarantees quantity does not fall below 0 under concurrent stock-outs.
        const updateResult = await tx.product.updateMany({
          where: {
            id: product.id,
            companyId: input.companyId,
            quantity: { gte: input.quantity },
          },
          data: {
            quantity: { decrement: input.quantity },
            updatedAt: new Date(),
          },
        });

        if (updateResult.count === 0) {
          throw new BadRequestException('Insufficient stock for stock-out');
        }
      } else {
        await tx.product.update({
          where: { id: product.id },
          data: {
            quantity: { increment: input.quantity },
            ...(input.unitCost != null ? { costPrice: input.unitCost } : {}),
            updatedAt: new Date(),
          },
        });
      }

      const quantityAfter =
        input.type === TransactionType.STOCK_IN
          ? quantityBefore + input.quantity
          : quantityBefore - input.quantity;

      const created = await tx.transaction.create({
        data: {
          id: randomUUID(),
          companyId: input.companyId,
          productId: product.id,
          profileId: input.profileId,
          type: input.type,
          quantity: input.quantity,
          reason:
            input.type === TransactionType.STOCK_OUT ? input.reason : undefined,
          unitPrice:
            input.type === TransactionType.STOCK_OUT
              ? input.unitPrice
              : undefined,
          unitCost:
            input.type === TransactionType.STOCK_IN
              ? input.unitCost
              : undefined,
          customer: input.customer,
          supplier: input.supplier,
          notes: input.notes,
          date: input.date ? new Date(input.date) : undefined,
        },
        include: { Product: true, Profile: true },
      });

      // Record immutable balance snapshot for inventory audit history
      await tx.inventoryHistory.create({
        data: {
          id: randomUUID(),
          productId: product.id,
          quantityBefore,
          quantityAfter,
          costPriceAtTime: product.costPrice,
          sellingPriceAtTime: product.sellingPrice,
          transactionId: created.id,
          description: `${input.type} of ${input.quantity} units`,
          timestamp: new Date(),
        },
      });

      return created;
    });
  }
}
