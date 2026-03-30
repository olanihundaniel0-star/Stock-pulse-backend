import { IsIn, IsOptional, IsString } from 'class-validator';

const PROFILE_ROLES = ['admin', 'user'] as const;

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsIn(PROFILE_ROLES)
  role?: (typeof PROFILE_ROLES)[number];

  @IsOptional()
  @IsIn(['Active', 'Inactive'])
  status?: 'Active' | 'Inactive';
}
