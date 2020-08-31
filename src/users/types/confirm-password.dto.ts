import { Length } from 'class-validator';

export class ConfirmPasswordDTO {
    username: string;
    verificationCode: string;
    @Length(8, 99)
    newPassword: string;
}
