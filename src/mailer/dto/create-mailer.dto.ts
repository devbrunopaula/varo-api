import { IsEmail, IsString } from 'class-validator';
import { Address } from 'nodemailer/lib/mailer';

export class CreateMailerDto {
  @IsString()
  @IsEmail()
  to: Address[];
  @IsString()
  subject: string;
  @IsString()
  text?: string;
  @IsString()
  html?: string;
  @IsString()
  @IsEmail()
  from?: Address;
  placeholderReplacement?: Record<string, string>;
}
