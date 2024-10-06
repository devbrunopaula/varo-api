import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBService } from './v1/db/db.service';
import { UsersController } from './v1/users/users.controller';
import { UsersService } from './v1/users/users.service';
import { UsersModule } from './v1/users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController, UsersController],
  providers: [AppService, DBService, UsersService],
})
export class AppModule {}
