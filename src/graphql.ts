
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface User {
    id?: string;
    email: string;
    username: string;
    password: string;
}

export interface IQuery {
    users(): User[] | Promise<User[]>;
}

export interface IMutation {
    signUp(email: string, username: string, password: string): User | Promise<User>;
}
