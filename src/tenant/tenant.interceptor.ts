import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantService } from './tenant.service';
import { DBService } from 'src/database/db.service';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  constructor(
    private tenantService: TenantService,
    private db: DBService,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('TenantInterceptor', user);
    const companyUser = await this.db.companyUser.findFirst({
      include: {
        company: true,
      },
      where: { userId: user.id },
    });

    if (!companyUser) {
      throw new Error('User not associated with any company');
    }

    this.tenantService.setCurrentTenant(companyUser.company);
    console.log('TenantInterceptor', companyUser.company.id);

    return next.handle();
  }
}
