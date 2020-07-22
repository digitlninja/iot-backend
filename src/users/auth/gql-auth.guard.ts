import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import Axios from 'axios';
import * as jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { Cache } from 'cache-manager';
import { AuthConfig } from './auth.config';

@Injectable()
export class GqlAuthGuard implements CanActivate, OnModuleInit {
  private jwkUrl = `https://cognito-idp.${this.authConfig.region}.amazonaws.com/${this.authConfig.userPoolId}/.well-known/jwks.json`;

  constructor(
    @Inject('AuthConfig')
    private readonly authConfig: AuthConfig,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async onModuleInit(): Promise<void> {
    const jwks = (await Axios.get(this.jwkUrl)).data.keys as any;
    this.cacheManager.set('jwks', jwks, { ttl: 3600 });
  }

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

  private async _getJwks() {
    const cachedJwks = this.cacheManager.get('jwks');
    if (cachedJwks) {
      return cachedJwks;
    } else {
      const jwks = (await Axios.get(this.jwkUrl)).data.keys as any;
      this.cacheManager.set('jwks', jwks, { ttl: 3600 });
      return jwks;
    }
  }

  private _getTokenFromHeader(authHeader: string): string {
    if (authHeader.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return authHeader.split(' ')[1];
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
    try {
      const token = this._getTokenFromHeader(authHeader);
      const jwks = this._getJwks();
      const pem = jwkToPem(jwks[1]);
      return await this._verifyToken(token, pem, { algorithms: ['RS256'] });
    } catch (err) {
      console.log('[GQL Auth Guard: Error]', err);
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
