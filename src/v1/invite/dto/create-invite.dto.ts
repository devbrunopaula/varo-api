import { IsEmail, IsOptional, IsString } from 'class-validator';

export class createInviteDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsEmail()
  email: string;
}
