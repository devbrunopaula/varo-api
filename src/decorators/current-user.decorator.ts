import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../v1/users/entities/user.entity';
import { AuthRequest } from '../auth/models/AuthRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  }
);
