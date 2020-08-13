import { Length, IsAlphanumeric, IsEmail } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  @Length(3, 20)
  username: string;

  @Length(3, 50)
  firstName: string;

  @Length(3, 50)
  lastName: string;

  @Length(8, 99)
  password: string;
}
