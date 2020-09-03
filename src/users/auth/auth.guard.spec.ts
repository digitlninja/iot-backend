import { CACHE_MANAGER, HttpException, } from '@nestjs/common';
import { AuthGuard } from "./auth.guard";
import { Test } from "@nestjs/testing";
import { AuthConfig } from "./auth.config";

const publicKeyDictionaryMock = {
    'IjF4ntg68tllCvRLOT8Cmk4ouHQNq0mATHkdo5pQ8R4=': {
        instance: [Object],
        pem: '-----BEGIN PUBLIC KEY-----\n' +
            'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAolS/vMqii1m66MIKwlFS\n' +
            '9zsEr9zG70V8xbwXooluhVtdFbLuJBgc/uenW8JZlSfZqY3ncZPPJ2232jlZAlqA\n' +
            'swxyHHTG3+mW68FzZe7qgc2BRjazUnzZT+EmyzWI4qv9jYSrpuHSIoU1XLKCoyyw\n' +
            'lfLu8joPVmxyzzSgbc3XzO+HFJEUZyrnQ0MQxcJ+g9TFO3mOlnNGmGJz+5tt2YNg\n' +
            'Yb3PKRHA3p6nfcnR4Tcv5N/OAR/cmsK9Rvh/vx8NiEc/Puj3qjSfSQP/5p0xuc5a\n' +
            'UcvfuWRxyqOHbNLKHl4Fqexi2JTiQ97NUxIxNPG8WQVEDUe+yVbw/MU5R6S7hjdT\n' +
            '1wIDAQAB\n' +
            '-----END PUBLIC KEY-----\n'
    },
    '5x9ogk7PfuUVP813i1UkmctlYY50DKuK6JkGMR48d6w=': {
        instance: [Object],
        pem: '-----BEGIN PUBLIC KEY-----\n' +
            'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhKSzwpd6iMCTXTn9fhtX\n' +
            'OhtQGigd5DbTNaiR8RNnIygoZ13712ygSaR0vrkOPUVzTCE2pBRxKHDNSUpWqXaw\n' +
            'HnGnRz9Znla9o7M6HUBdOR5CKyHiopfFO91DlP4kI/MCJa0e4fHcLO+Nw7xKdgi/\n' +
            'XxZ0NfGpJ+LgUvNFs7C5tnyPC9s6pdp1FW2rWbv769cv235/KdU+juzUux/ZAmNn\n' +
            'NQ+hWWaoYb5GZ/QbQaHqgklPbwr0a+7B1oLXpqUQ87dLvewMbynPSVhPHyuhYG+u\n' +
            'FwDMbIieXjZizuJvxWBen5dmCNlMZ0nyNr54do8Hi9IPiQFJ3GRcJtMUXZ3qdQf6\n' +
            'pwIDAQAB\n' +
            '-----END PUBLIC KEY-----\n'
    }
};

const authHeaderMock = "Bearer eyJraWQiOiJJakY0bnRnNjh0bGxDdlJMT1Q4Q21rNG91SFFOcTBtQVRIa2RvNXBROFI0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkMGJjODI0Yi1iZGE5LTQ4YWQtOWNjOS01Zjc3N2JiODQ1OTIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfUmlYcXRpR0YxIiwiY29nbml0bzp1c2VybmFtZSI6IjEyMyIsImdpdmVuX25hbWUiOiJXaWxsaWFtIiwiYXVkIjoiNXJqMmkzZjRhbzM0aGNja29iYmxyNjFzaWsiLCJldmVudF9pZCI6ImQ1YWM3ZDRiLWZjZWQtNDZiZC1iMzc2LTc0OTUzMDczYzY2YSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTk4OTUwMDcwLCJleHAiOjE1OTg5NTM2NzAsImlhdCI6MTU5ODk1MDA3MCwiZmFtaWx5X25hbWUiOiJMYW5nIiwiZW1haWwiOiJ3aWxsaWFtKzEyM0B0aHJlZXNwcmludHMuY29tIn0.j8gEOlirnY_gBiL7ne7d3gKLQ5YXBk34jsSj4F1hrPuvkqRTblQsAsMIV2OrKCJydzxxm8zT_QQz6NjRC6TjXxaFzYbWdIQHJJBwE1GPjNiZIqK1VGu0cxGkPNETBMPxMXYM_euGCXjJQIQ3-zEeBq3Xkd-MYEKIzMWRng3LiiSIpkz3SeXABeFj0vv3Hh5ezMyBMSrBIcjWP_eE_lhDtvPwep54UXM8yYdAH_B4SRy4ll3KgGPRkBz8AT1qowKGvXRJjkfgII0HtxzqSsXRvRwRxxR-aLMqG42W-MvklT18wSSG-1nYZBHTgb4a3C_1u6V_dUB6mnMt1e-JE3dUkw"
const invalidJWTAuthHeaderMock = authHeaderMock.replace('Bearer', 'Chewbacca');

const jwtTokenMock = "eyJraWQiOiJJakY0bnRnNjh0bGxDdlJMT1Q4Q21rNG91SFFOcTBtQVRIa2RvNXBROFI0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkMGJjODI0Yi1iZGE5LTQ4YWQtOWNjOS01Zjc3N2JiODQ1OTIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfUmlYcXRpR0YxIiwiY29nbml0bzp1c2VybmFtZSI6IjEyMyIsImdpdmVuX25hbWUiOiJXaWxsaWFtIiwiYXVkIjoiNXJqMmkzZjRhbzM0aGNja29iYmxyNjFzaWsiLCJldmVudF9pZCI6ImQ1YWM3ZDRiLWZjZWQtNDZiZC1iMzc2LTc0OTUzMDczYzY2YSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTk4OTUwMDcwLCJleHAiOjE1OTg5NTM2NzAsImlhdCI6MTU5ODk1MDA3MCwiZmFtaWx5X25hbWUiOiJMYW5nIiwiZW1haWwiOiJ3aWxsaWFtKzEyM0B0aHJlZXNwcmludHMuY29tIn0.j8gEOlirnY_gBiL7ne7d3gKLQ5YXBk34jsSj4F1hrPuvkqRTblQsAsMIV2OrKCJydzxxm8zT_QQz6NjRC6TjXxaFzYbWdIQHJJBwE1GPjNiZIqK1VGu0cxGkPNETBMPxMXYM_euGCXjJQIQ3-zEeBq3Xkd-MYEKIzMWRng3LiiSIpkz3SeXABeFj0vv3Hh5ezMyBMSrBIcjWP_eE_lhDtvPwep54UXM8yYdAH_B4SRy4ll3KgGPRkBz8AT1qowKGvXRJjkfgII0HtxzqSsXRvRwRxxR-aLMqG42W-MvklT18wSSG-1nYZBHTgb4a3C_1u6V_dUB6mnMt1e-JE3dUkw"
const invalidJWTTokenMock = 'Bearer v86at79y82.24570aipRl';
const decodedJwtHeaderMock = {
    "kid": `IjF4ntg68tllCvRLOT8Cmk4ouHQNq0mATHkdo5pQ8R4=`,
    "alg": "RS256"
};

const tenMinutesAgo = Date.now() / 1000 - 600;
const tenMinutesInTheFuture = Date.now() / 1000 + 600;
const claimMock = {
    token_use: "id",
    auth_time: tenMinutesAgo,
    iss: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
    exp: tenMinutesInTheFuture,
    username: "123",
    client_id: "testId"
};


describe('AuthGuard', () => {
    let authGuard: AuthGuard;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                AuthGuard,
                {
                    provide: AuthConfig,
                    useValue: new AuthConfig(),
                },
                {
                    provide: CACHE_MANAGER,
                    useValue: {},
                }],
        }).compile();
        authGuard = module.get(AuthGuard);
    });

    it('should be defined', () => {
        expect(authGuard).toBeDefined();
    });

    describe('validateToken()', () => {
        it('returns validation result', async () => {
            const authGuardProto = Object.getPrototypeOf(authGuard);
            jest.spyOn(authGuardProto, '_getEncodedAuthTokenFromHeader').mockReturnValueOnce(jwtTokenMock);
            jest.spyOn(authGuardProto, '_getDecodedJwtHeader').mockReturnValueOnce(decodedJwtHeaderMock);
            jest.spyOn(authGuardProto, '_getPublicKeyDictionary').mockResolvedValueOnce(publicKeyDictionaryMock);
            jest.spyOn(authGuardProto, '_verifyToken').mockResolvedValueOnce(claimMock);
            const result = await authGuard.validateToken(authHeaderMock);
            expect(result).toEqual({
                userName: claimMock.username,
                clientId: claimMock.client_id,
                isValid: true,
            });
        });
        it('throws an HttpException if a JWT auth header without "Bearer" is given', async () => {
            expect.assertions(2);
            const authGuardProto = Object.getPrototypeOf(authGuard);
            const _getEncodedAuthTokenFromHeaderSpy = jest.spyOn(authGuardProto, '_getEncodedAuthTokenFromHeader');
            try {
                await authGuard.validateToken(invalidJWTAuthHeaderMock);
            } catch (error) {
                expect(_getEncodedAuthTokenFromHeaderSpy).toHaveBeenCalledWith(invalidJWTAuthHeaderMock);
                expect(error.message).toMatch('Invalid token');
            }
        });
        it('throws an HttpException if an invalid JWT token header is given with auth header "Bearer"', async () => {
            const authGuardProto = Object.getPrototypeOf(authGuard);
            jest.spyOn(authGuardProto, '_getDecodedJwtHeader').mockReturnValueOnce('v86at79y82');
            jest.spyOn(authGuardProto, '_getPublicKeyDictionary').mockReturnValueOnce(publicKeyDictionaryMock);
            try {
                await authGuard.validateToken(invalidJWTTokenMock);
            } catch (error) {
                expect(error.message).toMatch('Claim made for unknown kid');
            }

        });
    });

    describe('_getEncodedAuthTokenFromHeader()', () => {
        it('returns a jwt token from an authorization header', () => {
            expect.assertions(1);
            const authGuardProto = Object.getPrototypeOf(authGuard);
            const result = authGuardProto._getEncodedAuthTokenFromHeader(authHeaderMock);
            expect(result).toEqual(authHeaderMock.split(' ')[1]);
        });
        it('throws an HttpException if a jwt auth header without Bearer is given', () => {
            expect.assertions(1);
            const authGuardProto = Object.getPrototypeOf(authGuard);
            expect(() => authGuardProto._getEncodedAuthTokenFromHeader(invalidJWTAuthHeaderMock)).toThrow(HttpException);
        });
        it('throws an HttpException if an invalid jwt auth header is given', () => {
            expect.assertions(1);
            const authGuardProto = Object.getPrototypeOf(authGuard);
            expect(() => authGuardProto._getEncodedAuthTokenFromHeader('ya7u8vijwjankll[vwa')).toThrow(HttpException);
        });

    });

    describe('_getDecodedJwtHeader()', () => {
        it('returns the decoded header section of an encoded JWT token', () => {
            expect.assertions(2);
            const authGuardProto = Object.getPrototypeOf(authGuard);
            const result = authGuardProto._getDecodedJwtHeader(jwtTokenMock);
            expect(result).toHaveProperty('kid');
            expect(result).toHaveProperty('alg');
        });
        it('throws an HttpException if given token doesn\'t have period separated sections\n', () => {
            expect.assertions(1);
            const authGuardProto = Object.getPrototypeOf(authGuard);
            expect(() => authGuardProto._getEncodedAuthTokenFromHeader(jwtTokenMock)).toThrow(HttpException);
        });
        it('throws an HttpException if an invalid jwt auth header is given', () => {
            expect.assertions(1);
            const authGuardProto = Object.getPrototypeOf(authGuard);
            expect(() => authGuardProto._getEncodedAuthTokenFromHeader('ya7u8vijwjankll[vwa')).toThrow(HttpException);
        });

    });

    afterEach(() => {
        // jwks.stop();
    });
});