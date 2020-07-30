import { Length, IsAlphanumeric, IsEmail } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  @Length(3, 20)
  username: string;

  @Length(8, 99)
  password: string;
}
