import { AuthConfig } from './auth.config';
import { Inject, Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CognitoTokens } from 'src/graphql';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  constructor(
    @Inject('AuthConfig')
    private readonly authConfig: AuthConfig,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

  signUp(createUserDto: CreateUserDto): Promise<CognitoUser> {
    const { username, email, password } = createUserDto;
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ];
    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, password, attributeList, null, function(
        error,
        result,
      ) {
        if (error) {
          console.log(error);
          reject(error.message);
        }
        resolve(result.user);
      });
    });
  }

  authenticateUser(username: string, password: string): Promise<CognitoTokens> {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          resolve({
            idToken: result.getIdToken().getJwtToken(),
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          });
        },
        onFailure: err => {
          reject(err);
        },
        newPasswordRequired: function(userAttributes, requiredAttributes) {
          delete userAttributes.email_verified;
          newUser.completeNewPasswordChallenge(password, userAttributes, this);
        },
      });
    });
  }
}
