import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async createUser(createUserDTO: CreateUserDto) {
    return await this.userRepository.createUser(createUserDTO);
  }
}
