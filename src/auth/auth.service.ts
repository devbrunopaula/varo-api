import { HttpException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { DBService } from 'src/v1/db/db.service';

@Injectable()
export class AuthService {
  constructor(private db: DBService) {}

  async validateUser({ email, password }: AuthPayloadDto) {
    const user = await this.db.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });

    if (!user) throw new HttpException('Invalid credentials');

    return user;
  }
}
