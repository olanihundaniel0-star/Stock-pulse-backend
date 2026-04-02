import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { StockOutReason, TransactionType } from '../../prisma/prisma-client';

export class CreateTransactionDto {
  @IsString()
  productId!: string;

  @IsEnum(TransactionType)
  type!: TransactionType;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsOptional()
  @IsEnum(StockOutReason)
  reason?: StockOutReason;

  @IsOptional()
  unitPrice?: number;

  @IsOptional()
  unitCost?: number;

  @IsOptional()
  @IsString()
  customer?: string;

  @IsOptional()
  @IsString()
  supplier?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  date?: string; // ISO date string
}

