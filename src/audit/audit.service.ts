import { Injectable } from '@nestjs/common';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { DBService } from 'src/database/db.service';

@Injectable()
export class AuditService {
  constructor(private readonly DB: DBService) {}
  create(createAuditDto: CreateAuditDto) {
    return 'This action adds a new audit';
  }

  async findAll() {
    return this.DB.auditLog.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} audit`;
  }

  update(id: number, updateAuditDto: UpdateAuditDto) {
    return `This action updates a #${id} audit`;
  }

  remove(id: number) {
    return `This action removes a #${id} audit`;
  }
}
