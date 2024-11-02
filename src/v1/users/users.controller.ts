import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IsPublic } from 'src/decorators/is-public.decorator';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { TenantInterceptor } from 'src/tenant/tenant.interceptor';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(TenantInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  // @ApiBearerAuth()
  @ApiSecurity('Bearer')
  async getUser() {
    return await this.usersService.getAllUsers();
  }

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }
}
