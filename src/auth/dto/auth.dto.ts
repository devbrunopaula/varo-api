export class AuthPayloadDto {
  id: string;
  email: string;
  username: string;
  displayName: string | null;
  name: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
