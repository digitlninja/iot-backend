import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth/auth.service';
import { CognitoTokens } from 'src/graphql';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    private authService: AuthService,
  ) {}

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async signUp(createUserDTO: CreateUserDto) {
    await this.authService.signUp(createUserDTO);
    return await this.userRepository.createUser(createUserDTO);
  }

  async login(createUserDTO: CreateUserDto): Promise<CognitoTokens> {
    return await this.authService.authenticateUser(
      createUserDTO.username,
      createUserDTO.password,
    );
  }
}
