import { Document, Schema } from 'mongoose';
import { Environment, IEnvironment } from './Environment';
import { IUser } from './User';

export interface ICustomer {
    name: string;
    environments?: IEnvironment[];
    users?: IUser[];
}

export interface Customer extends Document {
    name: string;
    environments: Environment[];
    users: Schema.Types.ObjectId[];
}
