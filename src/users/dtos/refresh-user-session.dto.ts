import { CognitoRefreshToken } from 'amazon-cognito-identity-js';

export class RefreshUserSessionDto {
  username: string;
  refreshToken: string;
}
