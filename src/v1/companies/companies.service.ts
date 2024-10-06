import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { DBService } from 'src/database/db.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly db: DBService,
    private readonly user: UsersService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const existingCompany = await this.db.company.findFirst({
      where: {
        name: createCompanyDto.name,
      },
    });

    if (existingCompany) {
      throw new BadRequestException('Company already exists');
    }

    const existingUser = await this.db.user.findFirst({
      where: {
        email: createCompanyDto.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const newCompany = await this.db.company.create({
      data: {
        name: createCompanyDto.name,
      },
    });

    const data: Prisma.UserCreateInput = {
      email: createCompanyDto.email,
      password: await bcrypt.hash(createCompanyDto.password, 10),
      role: Role.ADMIN,
    };
    const newUser = await this.db.user.create({ data });

    await this.db.profile.create({
      data: {
        firstName: createCompanyDto.firstName,
        lastName: createCompanyDto.lastName,
        phone: createCompanyDto.phone,
        userId: newUser.id,
      },
    });
    await this.db.companyUser.create({
      data: {
        companyId: newCompany.id,
        userId: newUser.id,
      },
    });

    return {
      ...newCompany,
      ...newUser,
      password: undefined,
    };
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
