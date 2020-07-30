
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface SignUpInput {
    email: string;
    username: string;
    password: string;
}

export interface LoginInput {
    username: string;
    password: string;
}

export interface ErrorResult {
    __typename?: 'ErrorResult';
    id?: string;
    path: string;
    message: string;
}

export interface ValidationFailed {
    __typename?: 'ValidationFailed';
    id?: string;
    path: string;
    messages?: string[];
}

export interface CognitoError {
    __typename?: 'CognitoError';
    id?: string;
    path: string;
    code: string;
    message: string;
}

export interface UsernameNotFound {
    __typename?: 'UsernameNotFound';
    id?: string;
    path: string;
    message: string;
}

export interface UserNotConfirmed {
    __typename?: 'UserNotConfirmed';
    id?: string;
    path: string;
    message: string;
}

export interface UsernameExists {
    __typename?: 'UsernameExists';
    id?: string;
    path: string;
    message: string;
}

export interface IncorrectCredentials {
    __typename?: 'IncorrectCredentials';
    id?: string;
    path: string;
    message: string;
}

export interface TooManyPasswordAttempts {
    __typename?: 'TooManyPasswordAttempts';
    id?: string;
    path: string;
    message: string;
}

export interface User {
    __typename?: 'User';
    id?: string;
    email?: string;
    username?: string;
}

export interface IQuery {
    __typename?: 'IQuery';
    users(): User[] | Promise<User[]>;
}

export interface CognitoAccessToken {
    __typename?: 'CognitoAccessToken';
    jwtToken?: string;
}

export interface CognitoTokens {
    __typename?: 'CognitoTokens';
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
}

export interface IMutation {
    __typename?: 'IMutation';
    signUp(user?: SignUpInput): SignUpResult | Promise<SignUpResult>;
    logIn(user?: LoginInput): LoginResult | Promise<LoginResult>;
    logOut(): boolean | Promise<boolean>;
    refreshUserTokens(): CognitoTokens | Promise<CognitoTokens>;
}

export type LoginResult = CognitoTokens | IncorrectCredentials | TooManyPasswordAttempts | UsernameNotFound | UserNotConfirmed | ValidationFailed | ErrorResult;
export type SignUpResult = User | UsernameExists | ValidationFailed | ErrorResult;
