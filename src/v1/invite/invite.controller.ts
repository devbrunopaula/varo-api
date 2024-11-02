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
import { AcceptedDto } from './dto/accepted.dto';
import { ApiTags } from '@nestjs/swagger';
import { createInviteDto } from './dto/create-invite.dto';

@ApiTags('Invite')
@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post('new')
  async create(@Body() createInviteDto: createInviteDto, @Request() req) {
    const loggedInUserId = String(req.user.id);

    return await this.inviteService.create(createInviteDto, loggedInUserId);
  }

  @Post('accepted')
  async accepted(@Body() acceptedInvitedDto: AcceptedDto) {
    return await this.inviteService.accept(acceptedInvitedDto);
  }

  @Get()
  findAll() {
    return this.inviteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.inviteService.findOne(+id);
  }

  @Patch(':id')
  update() {
    // return this.inviteService.update(+id, updateInviteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.inviteService.remove(+id);
  }
}
