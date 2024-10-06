import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DBService } from 'src/database/db.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly db: DBService) {}

  getAllUsers() {
    return this.db.user.findMany();
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.db.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  findByEmail(email: string) {
    return this.db.user.findUnique({ where: { email } });
  }

  getUserById(id: string) {
    return this.db.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}
