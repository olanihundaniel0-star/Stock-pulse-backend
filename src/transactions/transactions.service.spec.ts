import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionType, StockOutReason } from '@prisma/client';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let txMock: {
    product: {
      findFirst: jest.Mock;
      update: jest.Mock;
      updateMany: jest.Mock;
    };
    transaction: {
      create: jest.Mock;
    };
    inventoryHistory: {
      create: jest.Mock;
    };
  };
  let prisma: {
    $transaction: jest.Mock;
    transaction: {
      count: jest.Mock;
      findMany: jest.Mock;
    };
  };

  beforeEach(async () => {
    txMock = {
      product: {
        findFirst: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
      },
      transaction: {
        create: jest.fn(),
      },
      inventoryHistory: {
        create: jest.fn(),
      },
    };

    prisma = {
      $transaction: jest.fn((callback) => callback(txMock)),
      transaction: {
        count: jest.fn(),
        findMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  describe('create', () => {
    const companyId = 'c1234567-0000-0000-0000-000000000001';
    const profileId = 'u1234567-0000-0000-0000-000000000002';
    const productId = 'p1234567-0000-0000-0000-000000000003';

    it('should throw NotFoundException if product does not exist in company', async () => {
      txMock.product.findFirst.mockResolvedValue(null);

      await expect(
        service.create({
          profileId,
          productId,
          companyId,
          type: TransactionType.STOCK_IN,
          quantity: 10,
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should atomicaly check and decrement stock on STOCK_OUT', async () => {
      txMock.product.findFirst.mockResolvedValue({
        id: productId,
        companyId,
        quantity: 20,
        costPrice: 50,
        sellingPrice: 80,
      });
      txMock.product.updateMany.mockResolvedValue({ count: 1 });
      txMock.transaction.create.mockResolvedValue({
        id: 'tx-1',
        productId,
        type: TransactionType.STOCK_OUT,
        quantity: 5,
        Product: { name: 'Item 1' },
        Profile: { name: 'User 1' },
      });

      const result = await service.create({
        profileId,
        productId,
        companyId,
        type: TransactionType.STOCK_OUT,
        quantity: 5,
        reason: StockOutReason.Sale,
      });

      expect(txMock.product.updateMany).toHaveBeenCalledWith({
        where: {
          id: productId,
          companyId,
          quantity: { gte: 5 },
        },
        data: expect.objectContaining({
          quantity: { decrement: 5 },
        }),
      });
      expect(txMock.inventoryHistory.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          productId,
          quantityBefore: 20,
          quantityAfter: 15,
        }),
      });
      expect(result.id).toBe('tx-1');
    });

    it('should throw BadRequestException if stock is insufficient under atomic update', async () => {
      txMock.product.findFirst.mockResolvedValue({
        id: productId,
        companyId,
        quantity: 2,
        costPrice: 50,
        sellingPrice: 80,
      });
      txMock.product.updateMany.mockResolvedValue({ count: 0 });

      await expect(
        service.create({
          profileId,
          productId,
          companyId,
          type: TransactionType.STOCK_OUT,
          quantity: 5,
          reason: StockOutReason.Sale,
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should increment stock on STOCK_IN and record inventory history', async () => {
      txMock.product.findFirst.mockResolvedValue({
        id: productId,
        companyId,
        quantity: 10,
        costPrice: 50,
        sellingPrice: 80,
      });
      txMock.product.update.mockResolvedValue({ id: productId });
      txMock.transaction.create.mockResolvedValue({
        id: 'tx-2',
        productId,
        type: TransactionType.STOCK_IN,
        quantity: 15,
        Product: { name: 'Item 1' },
        Profile: { name: 'User 1' },
      });

      await service.create({
        profileId,
        productId,
        companyId,
        type: TransactionType.STOCK_IN,
        quantity: 15,
        unitCost: 55,
      });

      expect(txMock.product.update).toHaveBeenCalledWith({
        where: { id: productId },
        data: expect.objectContaining({
          quantity: { increment: 15 },
          costPrice: 55,
        }),
      });
      expect(txMock.inventoryHistory.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          productId,
          quantityBefore: 10,
          quantityAfter: 25,
        }),
      });
    });
  });
});
