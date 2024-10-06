import { IsEmail } from 'class-validator';
import { Invite } from '../entities/invite.entity';

export class CreateInviteDto extends Invite {
  @IsEmail()
  email: string;
}
