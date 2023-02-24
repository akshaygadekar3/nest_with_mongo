import { IsBoolean, IsString } from 'class-validator';

export class AdminAuthCredentialsDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsBoolean()
  isActive: boolean;
}
