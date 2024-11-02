import { Global, Module } from '@nestjs/common';
import { DBService } from './db.service';
@Global()
@Module({
  imports: [],
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
