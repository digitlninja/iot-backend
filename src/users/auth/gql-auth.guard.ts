import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import Axios from 'axios';
import * as jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

import { AuthConfig } from './auth.config';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  private jwkUrl = `https://cognito-idp.${this.authConfig.region}.amazonaws.com/${this.authConfig.userPoolId}/.well-known/jwks.json`;

  constructor(
    @Inject('AuthConfig')
    private readonly authConfig: AuthConfig,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) {
      return false;
    }
    try {
      const validationResult = await this.validateToken(
        ctx.headers.authorization,
      );
      ctx.user = validationResult;
      return true;
    } catch (err) {
      return false;
    }
  }

  private _verifyToken(
    token: string,
    pem: string,
    options: { algorithms: jwt.Algorithm[] },
  ): Promise<jwt.VerifyErrors> | Promise<object> {
    return new Promise((resolve, reject) =>
      jwt.verify(
        token,
        pem,
        {
          algorithms: options.algorithms,
        },
        (err, decodedToken) => {
          if (err) {
            reject(err);
          } else {
            resolve(decodedToken);
          }
        },
      ),
    );
  }

  async validateToken(authHeader: string) {
    if (authHeader.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = authHeader.split(' ')[1];
    try {
      const jwks = (await Axios.get(this.jwkUrl)).data.keys as any;
      const pem = jwkToPem(jwks[1]);
      return await this._verifyToken(token, pem, { algorithms: ['RS256'] });
    } catch (err) {
      console.log('[GQL Auth Guard: Error]', err);
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
