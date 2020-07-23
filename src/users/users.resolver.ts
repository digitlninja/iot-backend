import { Resolver, Mutation, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, CognitoTokens } from 'src/graphql';
import { GqlAuthGuard } from './auth/gql-auth.guard';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query()
  @UseGuards(GqlAuthGuard)
  async users(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Mutation()
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.signUp(createUserDto);
  }

  @Mutation()
  async login(@Body() createUserDto: CreateUserDto): Promise<CognitoTokens> {
    return await this.usersService.login(createUserDto);
  }
}
