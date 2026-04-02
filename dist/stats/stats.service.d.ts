import { PrismaService } from '../prisma/prisma.service';
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
export declare class StatsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDashboard(companyId: string): Promise<DashboardStats>;
}
