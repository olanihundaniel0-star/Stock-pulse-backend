import { Test, TestingModule } from '@nestjs/testing';
import { StatsService } from './stats.service';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionType, StockOutReason } from '@prisma/client';

describe('StatsService', () => {
  let service: StatsService;
  let prisma: {
    product: {
      findMany: jest.Mock;
    };
    transaction: {
      findMany: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      product: {
        findMany: jest.fn().mockResolvedValue([
          {
            quantity: 10,
            reorderLevel: 5,
            costPrice: 20,
            sellingPrice: 35,
          },
        ]),
      },
      transaction: {
        findMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [StatsService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<StatsService>(StatsService);
  });

  it('should exclude non-sale stock-outs (damaged, expired, theft) from sales counts and values', async () => {
    const today = new Date();
    prisma.transaction.findMany.mockResolvedValue([
      // Real sale: 2 units at $35
      {
        date: today,
        type: TransactionType.STOCK_OUT,
        reason: StockOutReason.Sale,
        quantity: 2,
        unitPrice: 35,
      },
      // Damaged goods: 3 units lost
      {
        date: today,
        type: TransactionType.STOCK_OUT,
        reason: StockOutReason.Damaged,
        quantity: 3,
        unitPrice: 35,
      },
      // Theft loss: 1 unit stolen
      {
        date: today,
        type: TransactionType.STOCK_OUT,
        reason: StockOutReason.Theft_Loss,
        quantity: 1,
        unitPrice: null,
      },
    ]);

    const result = await service.getDashboard('test-company-id');

    // Total sales count today must only be 2 (the actual sale), not 6!
    expect(result.todaySalesCount).toBe(2);
    // Total sales value today must only be $70 (2 * $35), not $175!
    expect(result.todaySalesValue).toBe(70);

    // In the chart for today, stockOut should reflect all 6 units out, but sales revenue should be $70
    const todayStr = today.toISOString().split('T')[0];
    const todayPoint = result.chart.find((p) => p.date === todayStr);
    expect(todayPoint).toBeDefined();
    expect(todayPoint?.stockOut).toBe(6);
    expect(todayPoint?.sales).toBe(70);
  });
});
