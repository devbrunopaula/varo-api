import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { DBService } from './database/db.service';
import { UsersController } from './v1/users/users.controller';
import { UsersService } from './v1/users/users.service';
import { UsersModule } from './v1/users/users.module';
import { AuthModule } from './auth/auth.module';
import { DBModule } from './database/db.module';
import { InviteModule } from './v1/invite/invite.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [UsersModule, AuthModule, DBModule, InviteModule],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    DBService,
    UsersService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
