import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthService } from './auth/auth.service';
import { SignUpInput, LoginResult, SignUpResult, User } from 'src/graphql';
import { LoginDTO } from './types/login.dto';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    private authService: AuthService,
  ) {}

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async signUp(user: SignUpInput): Promise<SignUpResult> {
    await this.authService.signUp(user);
    return await this.userRepository.createUser(user);
  }

  async logIn(user: LoginDTO): Promise<LoginResult> {
    return await this.authService.authenticateUser(user);
  }
}
