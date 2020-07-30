import { AuthConfig } from './auth.config';
import { Inject, Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
  CognitoRefreshToken,
} from 'amazon-cognito-identity-js';
import { CognitoTokens } from 'src/graphql';
import { LoginDTO } from '../types/login.dto';
import { RegisterDTO } from '../types/register.dto';

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

  signUp(user: RegisterDTO): Promise<CognitoUser> {
    const { email, username, password } = user;
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
          console.log('[Auth Service: Cognito signUp() error]', error);
          reject(error);
        }
        resolve(result.user);
      });
    });
  }

  private _getTokensFromSession(
    userSession: CognitoUserSession,
  ): CognitoTokens {
    return {
      idToken: userSession.getIdToken().getJwtToken(),
      accessToken: userSession.getAccessToken().getJwtToken(),
      refreshToken: userSession.getRefreshToken().getToken(),
    };
  }

  authenticateUser(user: LoginDTO): Promise<CognitoTokens> {
    const { username, password } = user;
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
          resolve(this._getTokensFromSession(result));
        },
        onFailure: error => {
          console.log(
            '[Auth Service: Cognito authenticateUser() error]',
            error,
          );
          reject(error);
        },
        newPasswordRequired: function(userAttributes, requiredAttributes) {
          delete userAttributes.email_verified;
          newUser.completeNewPasswordChallenge(password, userAttributes, this);
        },
      });
    });
  }

  refreshUserTokens(
    username: string,
    refreshToken: string,
  ): Promise<CognitoTokens> {
    const userData = {
      Username: username,
      Pool: this.userPool,
    };
    const RefreshToken = new CognitoRefreshToken({
      RefreshToken: refreshToken,
    });
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      return cognitoUser.refreshSession(RefreshToken, (err, userSession) => {
        const tokens = this._getTokensFromSession(userSession);
        resolve(tokens);
        if (err) {
          reject(err.message);
        }
      });
    });
  }
}
