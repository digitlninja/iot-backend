import { Resolver, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, CognitoAccessToken } from 'src/graphql';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation()
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.signUp(createUserDto);
  }

  @Mutation()
  async login(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CognitoAccessToken> {
    return await this.usersService.login(createUserDto);
  }
}
