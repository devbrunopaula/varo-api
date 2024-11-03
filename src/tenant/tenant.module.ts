import { Module, Global } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantInterceptor } from './tenant.interceptor';

@Global()
@Module({
  imports: [],
  providers: [TenantService, TenantInterceptor],
  exports: [TenantService],
})
export class TenantModule {}
