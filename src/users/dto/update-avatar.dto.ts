import { IsString, IsUrl } from 'class-validator';

export class UpdateAvatarDto {
  @IsString()
  @IsUrl({ require_tld: false })
  avatarUrl: string;
}
