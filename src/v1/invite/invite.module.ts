import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { DBService } from 'src/database/db.service';

@Module({
  controllers: [InviteController],
  providers: [InviteService, DBService],
})
export class InviteModule {}
