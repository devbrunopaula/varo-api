enum AuditActionEnum {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}

export class Audit {
  id: string;
  entity: string;
  entityId: string;
  action: AuditActionEnum;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}
