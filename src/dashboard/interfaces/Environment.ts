import { Document, Schema } from 'mongoose';
import { Customer, ICustomer } from './Customer';

export interface IEnvironment {
    _id: Schema.Types.ObjectId;
    name: string;
    slug: string;
    customer?: ICustomer;
}

export interface Environment extends Document {
    name: string;
    slug: string;
    customerId?: Schema.Types.ObjectId;
    customer: Customer;
}
