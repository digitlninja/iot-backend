import { Length } from 'class-validator';

export class LoginDTO {
    @Length(3, 90)
    username: string;

    @Length(8, 99)
    password: string;

    redirectUrl: string;
}
