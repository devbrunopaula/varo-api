import { BadRequestException, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UsersService } from 'src/v1/users/users.service';
import { UserToken } from './models/UserToken';
import { UserPayload } from './models/UserPayload';
import { User } from 'src/v1/users/entities/user.entity';
import { DBService } from 'src/database/db.service';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly db: DBService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.'
    );
  }

  async register(payload) {
    // Check if user already exists
    const existingUser = await this.db.user.findUnique({
      where: {
        email: payload.email
      }
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Check for pending user invitation

    const existingInvitation = await this.db.invitation.findFirst({
      where: {
        email: payload.email
      }
    });

    if (existingInvitation) {
      throw new BadRequestException('User already invited');
    }

    const newCompany = await this.db.company.create({
      data: {
        name: payload.companyName,
        description: ''
      }
    });

    const hashPassword = await bcrypt.hash(payload.password, 10);

    const newUser = await this.db.user.create({
      data: {
        email: payload.email,
        password: hashPassword,
        role: Role.ADMIN,
        companyId: newCompany.id,
        profile: {
          create: {}
        },
        employee: {
          create: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            phone: payload.phone
          }
        }
      }
    });

    // Create entry in CompanyUser pivot table
    await this.db.companyUser.create({
      data: {
        companyId: newCompany.id,
        userId: newUser.id
      }
    });
  }

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email
    };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
