import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UsersService } from 'src/v1/users/users.service';
import { UserToken } from './models/UserToken';
import { UserPayload } from './models/UserPayload';
import { User } from 'src/v1/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }

  // async createUser(payload) {
  //   const newCompany = await this.db.company.create({
  //     data: {
  //       name: payload.companyName,
  //       description: 'Company description',
  //     },
  //   });

  //   const newUser = await this.db.user.create({
  //     data: {
  //       email: payload.email,
  //       password: payload.password,
  //       username: payload.username,
  //       Profile: {
  //         create: {
  //           firstName: payload.firstName,
  //           lastName: payload.lastName,
  //           phone: payload.phone,
  //         },
  //       },
  //     },
  //   });

  //   await this.db.companyUser.create({
  //     data: {
  //       userId: newUser.id,
  //       companyId: newCompany.id,
  //     },
  //   });

  //   return newUser;
  // }

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
