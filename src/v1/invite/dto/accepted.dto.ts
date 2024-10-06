import { IsString } from 'class-validator';
import { Invite } from '../entities/invite.entity';

export class AcceptedDto extends Invite {
  @IsString()
  token: string;
  @IsString()
  password: string;
}
