import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DBService } from 'src/database/db.service';
import { InvitationStatus, Role } from '@prisma/client';

import { UsersService } from '../users/users.service';

@Injectable()
export class InviteService {
  constructor(
    private readonly db: DBService,
    private userService: UsersService
  ) {}

  async create(payload, invitedBy: string) {
    const token = await this.generateInviteToken(); // Generate a token for invite acceptance

    const pendingInvitation = await this.db.invitation.findFirst({
      where: {
        email: payload.email
      }
    });
    const existingUser = await this.db.user.findFirst({
      where: {
        email: payload.email
      }
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    if (pendingInvitation) {
      throw new BadRequestException('Pending invitation already exists');
    }

    // Check if the logged-in user is an admin
    const invitedByUser = await this.db.user.findFirst({
      where: { id: invitedBy }
    });
    console.log('invitedByUser', invitedByUser);

    if (invitedByUser?.role !== Role.ADMIN) {
      throw new NotFoundException('User Must be an admin to invite users');
    }

    const invitation = await this.db.invitation.create({
      data: {
        ...payload,
        role: Role.USER, // default role
        invitedBy, // logged-in user's ID
        token, // generated invite token
        companyId: await this.getCompanyIdOfUser(invitedBy) // logged-in user's company ID
      }
    });
    console.log('invitation', await this.getCompanyIdOfUser(invitedBy));

    // Send email with token link
    // await this.emailService.sendInviteEmail(email, token);

    return invitation;
  }

  findAll() {
    return `This action returns all invite`;
  }

  async findOne(token: string) {
    return await this.db.invitation.findFirst({ where: { token } });
  }

  // Accept the invitation
  async accept(payload) {
    const invitation = await this.db.invitation.findFirst({
      where: {
        token: payload.token,
        status: InvitationStatus.PENDING
      }
    });
    console.log('invitation', invitation);

    if (!invitation) {
      throw new NotFoundException('Invitation not found or expired.');
    }

    const hashedPassword = await this.hashPassword(payload.password);

    // Update the invitation status to ACCEPTED
    const updateInvitation = await this.db.invitation.update({
      where: {
        id: invitation.id,
        token: payload.token
      },
      data: {
        status: InvitationStatus.ACCEPTED
      }
    });

    if (updateInvitation.status === 'ACCEPTED') {
      const existingUser = await this.db.user.findFirst({
        where: {
          email: invitation.email
        }
      });

      if (existingUser) {
        throw new BadRequestException('User already exists');
      }

      // Create the user based on the invitation details
      const newUser = await this.db.user.create({
        data: {
          email: invitation.email,
          password: hashedPassword,
          role: invitation.role,
          companyId: invitation.companyId,
          invitedToken: invitation.token,

          profile: {
            create: {}
          },
          employee: {
            create: {
              firstName: invitation.firstName,
              lastName: invitation.lastName,
              email: invitation.email,
              phone: payload.phone
            }
          }
        }
      });

      // Create the employee and connect it with the newly created user

      return newUser;
    }

    throw new NotFoundException('Could not create user');
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  generateInviteToken() {
    // Generate a random secure token (e.g., using JWT, UUID, or a random string)
    return bcrypt.hashSync(Math.random().toString(36).substring(2), 10);
  }
  async getCompanyIdOfUser(userId: string) {
    // Fetch the companyId of the logged-in user
    const user = await this.db.user.findUnique({
      where: { id: userId }
    });

    return user?.companyId;
  }
}
