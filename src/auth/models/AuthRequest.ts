import { Request } from 'express';
import { User } from '../../v1/users/entities/user.entity';

export interface AuthRequest extends Request {
  user: User;
}
