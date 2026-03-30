import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { ProductStatus } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(params: {
    search?: string;
    category?: string;
    status?: ProductStatus;
    stockStatus?: 'inStock' | 'lowStock' | 'critical';
    page: number;
    pageSize: number;
  }) {
    const { page, pageSize, search, category, status, stockStatus } = params;

    const baseWhere: any = {};
    if (category) baseWhere.category = category;
    if (status) baseWhere.status = status;

    if (search) {
      baseWhere.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
        { supplierName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (!stockStatus) {
      const [total, items] = await Promise.all([
        this.prisma.product.count({ where: baseWhere }),
        this.prisma.product.findMany({
          where: baseWhere,
          orderBy: { updatedAt: 'desc' },
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
      ]);
      return { total, items };
    }

    if (stockStatus === 'critical') {
      const where = { ...baseWhere, quantity: 0 };
      const [total, items] = await Promise.all([
        this.prisma.product.count({ where }),
        this.prisma.product.findMany({
          where,
          orderBy: { updatedAt: 'desc' },
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
      ]);
      return { total, items };
    }

    // For lowStock/inStock we need field-to-field comparison (quantity vs reorderLevel).
    // Prisma doesn't support that in the filter DSL, so we do it in-memory for now.
    const all = await this.prisma.product.findMany({
      where: baseWhere,
      orderBy: { updatedAt: 'desc' },
      take: 2000,
    });

    const filtered = all.filter((p) => {
      if (stockStatus === 'lowStock')
        return p.quantity > 0 && p.quantity < p.reorderLevel;
      return p.quantity >= p.reorderLevel;
    });

    const total = filtered.length;
    const items = filtered.slice((page - 1) * pageSize, page * pageSize);
    return { total, items };
  }

  get(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  create(data: {
    name: string;
    sku: string;
    category: string;
    description?: string;
    image?: string;
    costPrice: number;
    sellingPrice: number;
    quantity: number;
    reorderLevel: number;
    supplierName: string;
    supplierContact?: string;
    location?: string;
    unit: string;
    status: ProductStatus;
  }) {
    return this.prisma.product.create({
      data: {
        id: randomUUID(),
        ...data,
        costPrice: data.costPrice,
        sellingPrice: data.sellingPrice,
        updatedAt: new Date(),
      },
    });
  }

  update(id: string, data: any) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}

