import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DBService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    this.$connect()
      .then(() => console.log('Database connected'))
      .catch((error) => console.error(error, 'Database connection failed'));
  }

  onModuleDestroy() {
    this.$disconnect()
      .then(() => console.log('Database disconnected'))
      .catch((error) => console.error(error, 'Database disconnection failed'));
  }
}
