import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { User, CognitoTokens, LoginResult, SignUpResult } from 'src/graphql';
import { GqlAuthGuard } from './auth/gql-auth.guard';
import { AuthService } from './auth/auth.service';
import { RegisterDTO } from './types/register.dto';
import { LoginDTO } from './types/login.dto';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import {
  createErrorResultFromAWSLoginException,
  createErrorResultFromAWSSignUpException,
} from 'src/shared/helpers';
import { __typeNames } from 'src/constants';

interface MyError extends Error {
  id?: string;
  path?: string;
}

@Resolver('User')
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  private _cookieConfig = {
    httpOnly: true,
  };

  @Query()
  @UseGuards(GqlAuthGuard)
  async users(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Mutation()
  async signUp(@Args('user') registerDTO: RegisterDTO): Promise<SignUpResult> {
    try {
      const user = (await this.usersService.signUp(registerDTO)) as User;
      return { ...user, __typename: 'User' };
    } catch (error) {
      console.log('[Users resolver signUp mutation: Error]', error);
      return createErrorResultFromAWSSignUpException(error);
    }
  }

  @Mutation()
  async logIn(
    @Context() context: ExpressContext,
    @Args('user') loginDTO: LoginDTO,
  ): Promise<LoginResult> {
    try {
      const tokens = (await this.usersService.logIn(loginDTO)) as CognitoTokens;
      context.res.cookie(
        'refreshToken',
        tokens.refreshToken,
        this._cookieConfig,
      );
      context.res.cookie('username', loginDTO.username, this._cookieConfig);
      return { ...tokens, __typename: 'CognitoTokens' };
    } catch (error) {
      console.log('[Users resolver logIn mutation: Error]', error);
      return createErrorResultFromAWSLoginException(error);
    }
  }

  @Mutation()
  async logOut(@Context() context: ExpressContext): Promise<boolean> {
    try {
      context.res.clearCookie('refreshToken');
      context.res.clearCookie('username');
      return true;
    } catch (error) {
      console.log('[Users resolver logOut mutation: Error]', error);
      return error;
    }
  }

  @Mutation()
  async refreshUserTokens(@Context() context: ExpressContext) {
    try {
      const refreshToken = context.req.cookies.refreshToken;
      const username = context.req.cookies.username;
      return await this.authService.refreshUserTokens(username, refreshToken);
    } catch (error) {
      console.log('[Users resolver refreshUserTokens mutation: Error]', error);
      throw error;
    }
  }
}
