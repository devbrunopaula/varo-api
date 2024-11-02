import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { MailerService } from './mailer.service';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { UpdateMailerDto } from './dto/update-mailer.dto';

@Controller('email')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  async sendMail(createMailerDto: CreateMailerDto) {
    const mailerData = {
      from: { name: 'Test', address: 'test@fedex.com' },
      to: [{ address: 'john@example.com', name: 'John Doe' }],
      subject: 'Test email',
      text: 'This is a test email',
      html: '<p>This is a test email</p>'
    };

    return this.mailerService.sendMail(mailerData);
  }

  @Post()
  create(@Body() createMailerDto: CreateMailerDto) {
    return this.mailerService.create(createMailerDto);
  }

  @Get()
  findAll() {
    return this.mailerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailerDto: UpdateMailerDto) {
    return this.mailerService.update(+id, updateMailerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailerService.remove(+id);
  }
}
