import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  industry?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  logoUrl?: string;
}
