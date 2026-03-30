import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ProductStatus } from '@prisma/client';
import { ListProductsQuery } from './dto/list-products.query';
import { UpsertProductDto } from './dto/upsert-product.dto';
import { ProductsService } from './products.service';

@UseGuards(SupabaseAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  async list(@Query() q: ListProductsQuery) {
    const { total, items } = await this.products.list({
      search: q.search,
      category: q.category,
      status: q.status ? (q.status as ProductStatus) : undefined,
      stockStatus: q.stockStatus,
      page: q.page,
      pageSize: q.pageSize,
    });

    return {
      total,
      items: items.map((p) => ({
        ...p,
        costPrice: Number(p.costPrice),
        sellingPrice: Number(p.sellingPrice),
      })),
    };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const p = await this.products.get(id);
    if (!p) return null;
    return {
      ...p,
      costPrice: Number(p.costPrice),
      sellingPrice: Number(p.sellingPrice),
    };
  }

  @Roles('admin')
  @Post()
  async create(@Body() dto: UpsertProductDto) {
    const created = await this.products.create({
      ...dto,
      status: dto.status as ProductStatus,
    });
    return {
      ...created,
      costPrice: Number(created.costPrice),
      sellingPrice: Number(created.sellingPrice),
    };
  }

  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpsertProductDto) {
    const updated = await this.products.update(id, {
      ...dto,
      status: dto.status as ProductStatus,
    });
    return {
      ...updated,
      costPrice: Number(updated.costPrice),
      sellingPrice: Number(updated.sellingPrice),
    };
  }

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.products.remove(id);
    return { ok: true };
  }
}

