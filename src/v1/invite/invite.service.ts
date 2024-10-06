import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UpdateInviteDto } from './dto/update-invite.dto';
import * as bcrypt from 'bcrypt';
import { DBService } from 'src/database/db.service';
import { Role } from '@prisma/client';

@Injectable()
export class InviteService {
  constructor(private readonly db: DBService) {}

  async create(createInviteDto: CreateInviteDto, invitedBy: string) {
    const token = await this.generateInviteToken(); // Generate a token for invite acceptance

    const invitation = await this.db.invitation.create({
      data: {
        email: createInviteDto.email,
        role: Role.USER, // default role
        invitedBy, // logged-in user's ID
        token, // generated invite token
        companyId: await this.getCompanyIdOfUser(invitedBy), // get inviter's companyId
      },
    });

    // Send email with token link
    // await this.emailService.sendInviteEmail(email, token);

    return invitation;
  }

  findAll() {
    return `This action returns all invite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invite`;
  }

  update(id: number, updateInviteDto: UpdateInviteDto) {
    return `This action updates a #${id} invite`;
  }

  remove(id: number) {
    return `This action removes a #${id} invite`;
  }

  generateInviteToken() {
    // Generate a random secure token (e.g., using JWT, UUID, or a random string)
    return bcrypt.hashSync(Math.random().toString(36).substring(2), 10);
  }
  async getCompanyIdOfUser(userId: string) {
    // Fetch the companyId of the logged-in user
    const user = await this.db.user.findUnique({
      where: { id: userId },
      include: { Profile: true },
    });
    return user?.companyId;
  }

  async accept({ token, password }) {
    const invitation = await this.db.invitation.findFirst({
      where: { token },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found or expired.');
    }

    const hashedPassword = await this.hashPassword(password);

    // Create the user with the invite details
    const user = await this.db.user.create({
      data: {
        email: invitation.email,
        password: hashedPassword,
        role: invitation.role,
        companyId: invitation.companyId,
      },
    });

    await this.db.profile.create({
      data: {
        userId: user.id,
        companyId: invitation.companyId,
      },
    });

    // Remove the invitation record after acceptance
    await this.db.invitation.delete({ where: { id: invitation.id } });

    return user;
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
