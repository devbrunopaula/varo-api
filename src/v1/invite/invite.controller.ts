import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { InviteService } from './invite.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UpdateInviteDto } from './dto/update-invite.dto';
import { AcceptedDto } from './dto/accepted.dto';

@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post('new')
  async create(@Body() createInviteDto: CreateInviteDto, @Request() req) {
    const loggedInUserId = String(req.user.id);
    return await this.inviteService.create(createInviteDto, loggedInUserId);
  }

  @Post('accepted')
  async accepted(@Body() acceptedDto: AcceptedDto) {
    return await this.inviteService.accept({
      token: acceptedDto.token,
      password: acceptedDto.password,
    });
  }

  @Get()
  findAll() {
    return this.inviteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inviteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInviteDto: UpdateInviteDto) {
    return this.inviteService.update(+id, updateInviteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inviteService.remove(+id);
  }
}
