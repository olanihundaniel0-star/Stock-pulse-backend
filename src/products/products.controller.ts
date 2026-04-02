import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ProductStatus } from '@prisma/client';
import { ListProductsQuery } from './dto/list-products.query';
import { UpsertProductDto } from './dto/upsert-product.dto';
import { ProductsService } from './products.service';

type AuthenticatedRequest = {
  user: {
    companyId: string | null;
  };
};

@UseGuards(SupabaseAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  private requireCompanyId(req: AuthenticatedRequest): string {
    if (!req.user.companyId) {
      throw new ForbiddenException('Company setup required');
    }
    return req.user.companyId;
  }

  @Get()
  async list(@Req() req: AuthenticatedRequest, @Query() q: ListProductsQuery) {
    const companyId = this.requireCompanyId(req);
    const { total, items } = await this.products.list({
      search: q.search,
      category: q.category,
      status: q.status ? (q.status as ProductStatus) : undefined,
      stockStatus: q.stockStatus,
      companyId,
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
  async get(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const p = await this.products.get(id, this.requireCompanyId(req));
    return {
      ...p,
      costPrice: Number(p.costPrice),
      sellingPrice: Number(p.sellingPrice),
    };
  }

  @Roles('admin')
  @Post()
  async create(@Req() req: AuthenticatedRequest, @Body() dto: UpsertProductDto) {
    const created = await this.products.create({
      ...dto,
      companyId: this.requireCompanyId(req),
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
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpsertProductDto,
  ) {
    const updated = await this.products.update(id, {
      ...dto,
      status: dto.status as ProductStatus,
    }, this.requireCompanyId(req));
    return {
      ...updated,
      costPrice: Number(updated.costPrice),
      sellingPrice: Number(updated.sellingPrice),
    };
  }

  @Roles('admin')
  @Delete(':id')
  async remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    await this.products.remove(id, this.requireCompanyId(req));
    return { ok: true };
  }
}

