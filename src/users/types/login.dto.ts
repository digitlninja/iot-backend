import { Length, IsAlphanumeric } from 'class-validator';

export class LoginDTO {
  @IsAlphanumeric()
  @Length(3, 20)
  username: string;

  @Length(8, 99)
  password: string;

  redirectUrl: string;
}
