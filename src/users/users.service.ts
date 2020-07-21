import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth/auth.service';
import { CognitoAccessToken } from 'src/graphql';

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

  async login(createUserDTO: CreateUserDto): Promise<CognitoAccessToken> {
    const { username, password } = createUserDTO;
    const result = await this.authService.authenticateUser(username, password);
    return { jwtToken: result.getJwtToken() };
  }
}
