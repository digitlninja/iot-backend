import { CACHE_MANAGER, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from "./auth.guard";
import { Test } from "@nestjs/testing";
import { AuthConfig } from "./auth.config";
import jwkToPem from "jwk-to-pem";
import { PublicKeyDictionary } from "./types/types";
import * as jwt from 'jsonwebtoken';

const jwtMock = jest.mock('jsonwebtoken');
const jwkToPemMock = jest.mock('jwk-to-pem');
const authConfigMock = {
    userPoolId: 'test',
    clientId: 'test',
    region: 'test',
    authority: 'https://cognito-idp.mock.amazonaws.com/mockId'
}
const jwksMock = {
    "keys": [{
        "alg": "RS256",
        "e": "AQAB",
        "kid": "IbT2en1PDhvlph67XYA5xX/THmYaS5xkVfezrfUlEsg=",
        "kty": "RSA",
        "n": "iG1jIMZ3TuzmlUMgE2_1KD9Cwo356NNdy7svjZjapYQL-aNub-pfx-tY2jOQN9LMvFhEIw_ZKA2RSG_SL-NjCg4QZ8nC-WtBqq2p8euoPdNwIWEKtx3CYQIc9YmfpRWKL3ZX3dSyBV_SFL6eVOd5iPyKSZtN8KpHB-o732xU8JzMYS0CMhVA5A1s5-WiWMdYxnTmCqC-xG8LtXqkgU_d9AJ3js9E4_I4nrbv7D1_PTboOUlpHUtrMJ5idZCQqZLE8koEfUJGRWTIepxAzJzW0D1WTE7GQ-x0LvcJbFylnDO0wit7CphSAlTAEj3OzdW4a-2ZEaUybwi6armkvWE8-w",
        "use": "sig"
    }, {
        "alg": "RS256",
        "e": "AQAB",
        "kid": "tSHGa5cExte4F6WG5566O1/jD0yN9W4dR1W85X0lqBo=",
        "kty": "RSA",
        "n": "yEApURAp-Q9OzpLny-eUa1TlSCntUNqJaGOeXTSQgveG1K8Br8COO-Zq1wrOqaX79hvVZfB-jVplGMzAEala-w7Hwhqt5nhDpLt5dCRLdvTwvwmkaeo9edtK8YDN7HqoUoNQ1TkQRJAAgCnVMsgno8_W5vpEUjRtuYD4P3sDajjF9Q7kDi-SfkEc0Idof55kDluaQs5bwgp1EK2aVoN0p1Kv42_DFMjGGKO9MWSGzl_NhhvDx8co2s89duarQiGbbAoxAxX_FkXDpoo2cLiKNRH-MB8y0-YdqtZPdx55wZriUsgarMGUpXOO6Q3blUb8J8NEfemLlQpUGgAbs-C_gw",
        "use": "sig"
    }]
}

const publicKeyDictionary = {
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
}
const authHeaderMock = "Bearer eyJraWQiOiJJakY0bnRnNjh0bGxDdlJMT1Q4Q21rNG91SFFOcTBtQVRIa2RvNXBROFI0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkMGJjODI0Yi1iZGE5LTQ4YWQtOWNjOS01Zjc3N2JiODQ1OTIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfUmlYcXRpR0YxIiwiY29nbml0bzp1c2VybmFtZSI6IjEyMyIsImdpdmVuX25hbWUiOiJXaWxsaWFtIiwiYXVkIjoiNXJqMmkzZjRhbzM0aGNja29iYmxyNjFzaWsiLCJldmVudF9pZCI6ImQ1YWM3ZDRiLWZjZWQtNDZiZC1iMzc2LTc0OTUzMDczYzY2YSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTk4OTUwMDcwLCJleHAiOjE1OTg5NTM2NzAsImlhdCI6MTU5ODk1MDA3MCwiZmFtaWx5X25hbWUiOiJMYW5nIiwiZW1haWwiOiJ3aWxsaWFtKzEyM0B0aHJlZXNwcmludHMuY29tIn0.j8gEOlirnY_gBiL7ne7d3gKLQ5YXBk34jsSj4F1hrPuvkqRTblQsAsMIV2OrKCJydzxxm8zT_QQz6NjRC6TjXxaFzYbWdIQHJJBwE1GPjNiZIqK1VGu0cxGkPNETBMPxMXYM_euGCXjJQIQ3-zEeBq3Xkd-MYEKIzMWRng3LiiSIpkz3SeXABeFj0vv3Hh5ezMyBMSrBIcjWP_eE_lhDtvPwep54UXM8yYdAH_B4SRy4ll3KgGPRkBz8AT1qowKGvXRJjkfgII0HtxzqSsXRvRwRxxR-aLMqG42W-MvklT18wSSG-1nYZBHTgb4a3C_1u6V_dUB6mnMt1e-JE3dUkw"
const jwtTokenMock = "eyJraWQiOiJJakY0bnRnNjh0bGxDdlJMT1Q4Q21rNG91SFFOcTBtQVRIa2RvNXBROFI0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkMGJjODI0Yi1iZGE5LTQ4YWQtOWNjOS01Zjc3N2JiODQ1OTIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfUmlYcXRpR0YxIiwiY29nbml0bzp1c2VybmFtZSI6IjEyMyIsImdpdmVuX25hbWUiOiJXaWxsaWFtIiwiYXVkIjoiNXJqMmkzZjRhbzM0aGNja29iYmxyNjFzaWsiLCJldmVudF9pZCI6ImQ1YWM3ZDRiLWZjZWQtNDZiZC1iMzc2LTc0OTUzMDczYzY2YSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTk4OTUwMDcwLCJleHAiOjE1OTg5NTM2NzAsImlhdCI6MTU5ODk1MDA3MCwiZmFtaWx5X25hbWUiOiJMYW5nIiwiZW1haWwiOiJ3aWxsaWFtKzEyM0B0aHJlZXNwcmludHMuY29tIn0.j8gEOlirnY_gBiL7ne7d3gKLQ5YXBk34jsSj4F1hrPuvkqRTblQsAsMIV2OrKCJydzxxm8zT_QQz6NjRC6TjXxaFzYbWdIQHJJBwE1GPjNiZIqK1VGu0cxGkPNETBMPxMXYM_euGCXjJQIQ3-zEeBq3Xkd-MYEKIzMWRng3LiiSIpkz3SeXABeFj0vv3Hh5ezMyBMSrBIcjWP_eE_lhDtvPwep54UXM8yYdAH_B4SRy4ll3KgGPRkBz8AT1qowKGvXRJjkfgII0HtxzqSsXRvRwRxxR-aLMqG42W-MvklT18wSSG-1nYZBHTgb4a3C_1u6V_dUB6mnMt1e-JE3dUkw"
const decodedJwtHeader = {
    "kid": `IjF4ntg68tllCvRLOT8Cmk4ouHQNq0mATHkdo5pQ8R4=`,
    "alg": "RS256"
}

const claimMock = {
    token_use: "id",
    auth_time: 1595499588,
    iss: "https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_KetEri36E",
    exp: 1595503188,
    username: "123",
    client_id: "testId"
}


describe('AuthGuard', () => {
    let authGuard: AuthGuard;


    beforeEach(async () => {
        // mockedEnv()
        // const jwks = createJWKSMock("https://MYAUTH0APP.auth0.com/");
        // jwks.start();

        const module = await Test.createTestingModule({
            providers: [
                AuthGuard,
                {
                    provide: AuthConfig,
                    useValue: authConfigMock,
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
            jest.spyOn(authGuardProto, '_getDecodedJwtHeader').mockReturnValueOnce(decodedJwtHeader);
            jest.spyOn(authGuardProto, '_getPublicKeyDictionary').mockResolvedValueOnce(publicKeyDictionary);
            jest.spyOn(authGuardProto, '_verifyClaim').mockReturnValueOnce(claimMock);
            const result = await authGuard.validateToken(authHeaderMock);
            expect(result).toEqual({
                userName: claimMock.username,
                clientId: claimMock.client_id,
                isValid: true,
            });
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
            const invalidJWTAuthHeader = authHeaderMock.replace('Bearer', 'Chewbacca')
            expect(() => authGuardProto._getEncodedAuthTokenFromHeader(invalidJWTAuthHeader)).toThrow(HttpException);
        });
        it('throws an HttpException if an invalid jwt auth header is given', () => {
            expect.assertions(1);
            const authGuardProto = Object.getPrototypeOf(authGuard);
            expect(() => authGuardProto._getEncodedAuthTokenFromHeader('ya7u8vijwjankll[vwa')).toThrow(HttpException);
        });

    });

    describe('_getDecodedJwtHeader()', () => {
        it('returns the decoded header section of an encoded JWT token', () => {
            // expect.assertions(2);
            const authGuardProto = Object.getPrototypeOf(authGuard);
            const result = authGuardProto._getDecodedJwtHeader(jwtTokenMock);
            expect(result).toHaveProperty('kid') // true
            expect(result).toHaveProperty('alg') // true
        });
        it('throws an HttpException if given token doesn\'t have period separated sections\n', () => {
            // expect.assertions(1);
            const authGuardProto = Object.getPrototypeOf(authGuard);
            expect(() => authGuardProto._getEncodedAuthTokenFromHeader(jwtTokenMock)).toThrow(HttpException);
        });
        it('throws an HttpException if an invalid jwt auth header is given', () => {
            // expect.assertions(1);
            const authGuardProto = Object.getPrototypeOf(authGuard);
            expect(() => authGuardProto._getEncodedAuthTokenFromHeader('ya7u8vijwjankll[vwa')).toThrow(HttpException);
        });

    });

    afterEach(() => {
        // jwks.stop();
    });
});