import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUser() {
    return await this.usersService.getAllUsers();
  }

  @Post()
  async createUser(@Body() user) {
    return await this.usersService.createUser(user);
  }
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }
}
