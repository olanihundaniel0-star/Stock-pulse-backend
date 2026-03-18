import { IsIn, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpsertProductDto {
  @IsString()
  name!: string;

  @IsString()
  sku!: string;

  @IsString()
  category!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNumber()
  @Min(0)
  costPrice!: number;

  @IsNumber()
  @Min(0)
  sellingPrice!: number;

  @IsInt()
  @Min(0)
  quantity!: number;

  @IsInt()
  @Min(0)
  reorderLevel!: number;

  @IsString()
  supplierName!: string;

  @IsOptional()
  @IsString()
  supplierContact?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsString()
  unit!: string;

  @IsIn(['Published', 'Draft'])
  status!: 'Published' | 'Draft';
}

