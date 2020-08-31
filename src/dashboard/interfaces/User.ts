import { Document } from 'mongoose';
import { Environment, IEnvironment } from './Environment';
import { Customer, ICustomer } from './Customer';

export interface IUser {
    name: string;
    email: string;
    customer: ICustomer;
    environments: IEnvironment[];
}

export interface User extends Document {
    name: string;
    email: string;
    customer: Customer;
    environments: Environment[];
}
