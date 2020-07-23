
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface User {
    id?: string;
    email?: string;
    username?: string;
}

export interface IQuery {
    users(): User[] | Promise<User[]>;
}

export interface CognitoAccessToken {
    jwtToken?: string;
}

export interface CognitoTokens {
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
}

export interface IMutation {
    signUp(email: string, username: string, password?: string): User | Promise<User>;
    login(username: string, password: string): CognitoTokens | Promise<CognitoTokens>;
}
