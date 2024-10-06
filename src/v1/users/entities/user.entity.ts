import { Role } from '@prisma/client';

export class User {
  id?: string;
  email: string;
  username?: string;
  displayName?: string;
  password: string;
  role: Role;
}

//  id          String        @id @default(cuid())
//   email       String        @unique
//   username    String?       @unique
//   displayName String?
//   password    String
//   role        Role          @default(USER)
//   createdAt   DateTime      @default(now())
//   updatedAt   DateTime      @updatedAt
//   CompanyUser CompanyUser[]
//   Profile     Profile[]
