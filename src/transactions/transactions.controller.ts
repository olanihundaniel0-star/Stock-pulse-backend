import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ListTransactionsQuery } from './dto/list-transactions.query';
import { TransactionsService } from './transactions.service';

@UseGuards(SupabaseAuthGuard, RolesGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly tx: TransactionsService) {}

  @Get()
  async list(@Query() q: ListTransactionsQuery) {
    const { total, items } = await this.tx.list({
      type: q.type,
      productId: q.productId,
      search: q.search,
      from: q.from,
      to: q.to,
      page: q.page,
      pageSize: q.pageSize,
    });

    return {
      total,
      items: items.map((t) => ({
        id: t.id,
        productId: t.productId,
        productName: t.product.name,
        type: t.type,
        quantity: t.quantity,
        unitPrice: t.unitPrice == null ? undefined : Number(t.unitPrice),
        unitCost: t.unitCost == null ? undefined : Number(t.unitCost),
        reason: t.reason ?? undefined,
        customer: t.customer ?? undefined,
        supplier: t.supplier ?? undefined,
        notes: t.notes ?? undefined,
        date: t.date.toISOString(),
        userId: t.profileId,
        userName: t.profile.name,
      })),
    };
  }

  @Post()
  async create(@Req() req: { user: { userId: string } }, @Body() body: CreateTransactionDto) {
    const created = await this.tx.create({
      profileId: req.user.userId,
      productId: body.productId,
      type: body.type,
      quantity: body.quantity,
      reason: body.reason,
      unitPrice: body.unitPrice,
      unitCost: body.unitCost,
      customer: body.customer,
      supplier: body.supplier,
      notes: body.notes,
      date: body.date,
    });

    return {
      id: created.id,
      productId: created.productId,
      productName: created.product.name,
      type: created.type,
      quantity: created.quantity,
      unitPrice: created.unitPrice == null ? undefined : Number(created.unitPrice),
      unitCost: created.unitCost == null ? undefined : Number(created.unitCost),
      reason: created.reason ?? undefined,
      customer: created.customer ?? undefined,
      supplier: created.supplier ?? undefined,
      notes: created.notes ?? undefined,
      date: created.date.toISOString(),
      userId: created.profileId,
      userName: created.profile.name,
    };
  }
}
