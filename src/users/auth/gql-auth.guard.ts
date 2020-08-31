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
import * as Axios from 'axios';
import * as jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { Cache } from 'cache-manager';
import { AuthConfig } from './auth.config';
import { TokenHeader, PublicKeyDictionary, Claim } from './types/types';

@Injectable()
export class GqlAuthGuard implements CanActivate, OnModuleInit {
    private cognitoIssuer = `https://cognito-idp.${this.authConfig.region}.amazonaws.com/${this.authConfig.userPoolId}`;
    private jwkEndpoint = `${this.cognitoIssuer}/.well-known/jwks.json`;

    constructor(
        @Inject('AuthConfig')
        private readonly authConfig: AuthConfig,
        @Inject('CACHE_MANAGER') private cacheManager: Cache,
    ) {
    }

    async onModuleInit(): Promise<void> {
        const publicKeys = await this._getAWSPublicKeysAsDictionary();
        await this.cacheManager.set<PublicKeyDictionary>('jwks', publicKeys, {
            ttl: 3600,
        });
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context).getContext();
        if (!ctx.req.headers.authorization) {
            return false;
        }
        let validationResult = {};
        try {
            validationResult = await this.validateToken(
                ctx.req.headers.authorization,
            );
            ctx.validationResult = validationResult;
            return true;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
        }
    }

    private async _getAWSPublicKeysAsDictionary(): Promise<PublicKeyDictionary> {
        const jwksResult = (await Axios.default.get(this.jwkEndpoint)).data;
        const publicKeyDictionary = jwksResult.keys.reduce((keys, currentKey) => {
            const pem = jwkToPem(currentKey);
            keys[currentKey.kid] = { instance: currentKey, pem };
            return keys;
        }, {} as PublicKeyDictionary);

        return publicKeyDictionary;
    }

    private async _getPublicKeyDictionary(): Promise<PublicKeyDictionary> {
        const cachedPublicKeys = await this.cacheManager.get('jwks');
        if (!cachedPublicKeys) {
            const publicKeyDictionary = await this._getAWSPublicKeysAsDictionary();
            await this.cacheManager.set<PublicKeyDictionary>(
                'jwks',
                publicKeyDictionary,
                {
                    ttl: 3600,
                },
            );
            return publicKeyDictionary;
        } else {
            return cachedPublicKeys;
        }
    }

    private _getEncodedAuthTokenFromHeader(authHeader: string): string {
        if (authHeader.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return authHeader.split(' ')[1];
    }

    private _getDecodedJwtHeader(encodedToken: string): TokenHeader {
        const tokenSections = (encodedToken || '').split('.');
        if (tokenSections.length < 2) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
        return JSON.parse(headerJSON) as TokenHeader;
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

    private _verifyClaim(claim: Claim): Claim {
        const { exp, auth_time, iss, token_use } = claim;
        const currentSeconds = Math.floor(new Date().valueOf() / 1000);
        if (currentSeconds > exp || currentSeconds < auth_time) {
            throw new HttpException('Expired claim', HttpStatus.UNAUTHORIZED);
        }
        if (iss !== this.cognitoIssuer) {
            throw new HttpException('Invalid claim issuer', HttpStatus.UNAUTHORIZED);
        }
        if (token_use !== 'id') {
            throw new HttpException('Claim use is not id', HttpStatus.UNAUTHORIZED);
        }
        return claim;
    }

    /* Validates jwt accesstoken */
    async validateToken(authHeader: string) {
        try {
            const encodedToken = this._getEncodedAuthTokenFromHeader(authHeader);
            const header = this._getDecodedJwtHeader(encodedToken);
            const keys = await this._getPublicKeyDictionary();
            const key = keys[header.kid];
            if (!key) {
                throw new Error('Claim made for unknown kid');
            }
            const claim = (await this._verifyToken(encodedToken, key.pem, {
                algorithms: [`${header.alg}`] as jwt.Algorithm[],
            })) as Claim;
            const { username, client_id } = this._verifyClaim(claim);
            return {
                userName: username,
                clientId: client_id,
                isValid: true,
            };
        } catch (err) {
            console.log('[GQL Auth Guard: Error]', err);
            throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
        }
    }
}
