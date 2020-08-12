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
import { CognitoTokens, ConfirmPasswordSuccess } from 'src/graphql';
import { LoginDTO } from '../types/login.dto';
import { RegisterDTO } from '../types/register.dto';
import { ConfirmPasswordDTO } from '../types/confirm-password.dto';

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
    const { email, username, firstName, lastName, password } = user;

    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
      new CognitoUserAttribute({
        Name: 'given_name',
        Value: firstName,
      }),
      new CognitoUserAttribute({
        Name: 'family_name',
        Value: lastName,
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
        newPasswordRequired: function(userAttributes) {
          delete userAttributes.email_verified;
          newUser.completeNewPasswordChallenge(password, userAttributes, this);
        },
      });
    });
  }

  forgotPassword(username: string): Promise<any> {
    const userData = {
      Username: username,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: result => {
          resolve(result.CodeDeliveryDetails);
        },
        onFailure: error => {
          console.log('[Auth Service: Cognito forgotPassword() error]', error);
          reject(error);
        },
      });
    });
  }

  confirmPassword(
    confirmPasswordDTO: ConfirmPasswordDTO,
  ): Promise<ConfirmPasswordSuccess> {
    const { username, verificationCode, newPassword } = confirmPasswordDTO;
    const userData = {
      Username: username,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => {
          resolve({ username });
        },
        onFailure: error => {
          console.log('[Auth Service: Cognito confirmPassword() error]', error);
          reject(error);
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
      return cognitoUser.refreshSession(RefreshToken, (error, userSession) => {
        const tokens = this._getTokensFromSession(userSession);
        resolve(tokens);
        if (error) {
          console.log(
            '[Auth Service: Cognito refreshUserTokens() error]',
            error,
          );
          reject(error);
        }
      });
    });
  }
}
