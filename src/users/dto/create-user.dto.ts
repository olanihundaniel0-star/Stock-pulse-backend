import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';

const PROFILE_ROLES = ['admin', 'user'] as const;

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsIn(PROFILE_ROLES)
  role!: (typeof PROFILE_ROLES)[number];

  @IsIn(['Active', 'Inactive'])
  status!: 'Active' | 'Inactive';
}
