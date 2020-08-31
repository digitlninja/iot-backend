import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';

export const UserSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        username: String,
        email: String,
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
        },
        environments: [
            {
                environment: {
                    type: Schema.Types.ObjectId,
                    ref: 'Environment',
                },
                roles: [{ type: 'String' }],
            },
        ],
    },
    { timestamps: true },
);

export interface UserModel extends Document {
    email: string;
    username: string;
    password: string;
}
