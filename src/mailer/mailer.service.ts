import { Injectable } from '@nestjs/common';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { UpdateMailerDto } from './dto/update-mailer.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  mailTransport() {
    const tranporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('EMAIL_USERNAME'),
        pass: this.configService.get<string>('EMAIL_PASSWORD')
      }
    });
    return tranporter;
  }

  async sendMail(createMailerDto: CreateMailerDto) {
    const { to, subject, text, html, from, placeholderReplacement } =
      createMailerDto;

    const transporter = this.mailTransport();

    const options: Mail.Options = {
      from: from || {
        name: this.configService.get<string>('EMAIL_USERNAME'),
        address: this.configService.get<string>('DEFAULT_EMAIL_FROM')
      },
      to,
      subject,
      text,
      html
    };

    try {
      const results = await transporter.sendMail(options);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }

  create(createMailerDto: CreateMailerDto) {
    return 'This action adds a new mailer';
  }

  findAll() {
    return `This action returns all mailer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mailer`;
  }

  update(id: number, updateMailerDto: UpdateMailerDto) {
    return `This action updates a #${id} mailer`;
  }

  remove(id: number) {
    return `This action removes a #${id} mailer`;
  }
}
