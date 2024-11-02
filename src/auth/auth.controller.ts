import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { IsPublic } from 'src/decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/v1/users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @IsPublic()
  @ApiOperation({ summary: 'Register a new user' })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createAuthDto: RegisterAuthDto) {
    return this.authService.register(createAuthDto);
  }
}
