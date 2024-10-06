import { Injectable } from '@nestjs/common';
import { DBService } from 'src/v1/db/db.service';

@Injectable()
export class UsersService {
  constructor(private db: DBService) {}

  getAllUsers() {
    return this.db.user.findMany();
  }
  createUser(user) {
    return this.db.user.create({
      data: user,
    });
  }

  getUserById(id: string) {
    return this.db.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}
