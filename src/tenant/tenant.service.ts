import { Injectable } from '@nestjs/common';
import { Company } from '@prisma/client';

@Injectable()
export class TenantService {
  private tenant: Company;

  setCurrentTenant(tenant: Company) {
    this.tenant = tenant;
  }

  getCurrentTenant() {
    console.log('TenantService.getCurrentTenant', this.tenant);
    return this.tenant;
  }
}
