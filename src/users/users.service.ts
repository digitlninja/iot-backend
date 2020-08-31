import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthService } from './auth/auth.service';
import {
    SignUpInput,
    LoginResult,
    SignUpResult,
    ForgotPasswordSuccess,
    User,
    ConfirmPasswordSuccess,
} from 'src/graphql';
import { LoginDTO } from './types/login.dto';
import { ConfirmPasswordDTO } from './types/confirm-password.dto';

@Injectable()
export class UsersService {
    constructor(
        private userRepository: UsersRepository,
        private authService: AuthService,
    ) {
    }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.getUsers();
    }

    async signUp(user: SignUpInput): Promise<SignUpResult> {
        await this.authService.signUp(user);
        return await this.userRepository.createUser(user);
    }

    async logIn(user: LoginDTO): Promise<LoginResult> {
        return await this.authService.authenticateUser(user);
    }

    async forgotPassword(username: string): Promise<ForgotPasswordSuccess> {
        const result = await this.authService.forgotPassword(username);
        return { email: result.Destination };
    }

    async confirmPassword(
        confirmPasswordDTO: ConfirmPasswordDTO,
    ): Promise<ConfirmPasswordSuccess> {
        return await this.authService.confirmPassword(confirmPasswordDTO);
    }
}
