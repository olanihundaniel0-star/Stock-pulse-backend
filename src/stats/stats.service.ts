import { Injectable } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

function dec(n: { toString(): string } | null | undefined): number {
  if (n == null) return 0;
  return Number(n.toString());
}

export interface DashboardChartPoint {
  date: string;
  label: string;
  sales: number;
  stockIn: number;
  stockOut: number;
}

export interface DashboardStats {
  totalItems: number;
  lowStockItems: number;
  inventoryValueCost: number;
  inventoryValueRetail: number;
  todaySalesCount: number;
  todaySalesValue: number;
  chart: DashboardChartPoint[];
}

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard(): Promise<DashboardStats> {
    const products = await this.prisma.product.findMany({
      select: {
        quantity: true,
        reorderLevel: true,
        costPrice: true,
        sellingPrice: true,
      },
    });

    const totalItems = products.length;
    const lowStockItems = products.filter((p) => p.quantity < p.reorderLevel).length;
    const inventoryValueCost = products.reduce(
      (acc, p) => acc + dec(p.costPrice) * p.quantity,
      0,
    );
    const inventoryValueRetail = products.reduce(
      (acc, p) => acc + dec(p.sellingPrice) * p.quantity,
      0,
    );

    const start = new Date();
    start.setUTCDate(start.getUTCDate() - 29);
    start.setUTCHours(0, 0, 0, 0);

    const recentTx = await this.prisma.transaction.findMany({
      where: { date: { gte: start } },
      select: {
        date: true,
        type: true,
        quantity: true,
        unitPrice: true,
      },
    });

    const todayStr = new Date().toISOString().split('T')[0];
    const todayOut = recentTx.filter(
      (t) => t.date.toISOString().split('T')[0] === todayStr && t.type === TransactionType.STOCK_OUT,
    );
    const todaySalesCount = todayOut.reduce((acc, t) => acc + t.quantity, 0);
    const todaySalesValue = todayOut.reduce(
      (acc, t) => acc + dec(t.unitPrice) * t.quantity,
      0,
    );

    const chart: DashboardChartPoint[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setUTCDate(d.getUTCDate() - i);
      d.setUTCHours(0, 0, 0, 0);
      const dateStr = d.toISOString().split('T')[0];
      const dayTx = recentTx.filter((t) => t.date.toISOString().split('T')[0] === dateStr);
      const stockIn = dayTx
        .filter((t) => t.type === TransactionType.STOCK_IN)
        .reduce((acc, t) => acc + t.quantity, 0);
      const stockOut = dayTx
        .filter((t) => t.type === TransactionType.STOCK_OUT)
        .reduce((acc, t) => acc + t.quantity, 0);
      const sales = dayTx
        .filter((t) => t.type === TransactionType.STOCK_OUT)
        .reduce((acc, t) => acc + dec(t.unitPrice) * t.quantity, 0);

      chart.push({
        date: dateStr,
        label: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        sales,
        stockIn,
        stockOut,
      });
    }

    return {
      totalItems,
      lowStockItems,
      inventoryValueCost,
      inventoryValueRetail,
      todaySalesCount,
      todaySalesValue,
      chart,
    };
  }
}
