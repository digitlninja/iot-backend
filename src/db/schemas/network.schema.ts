import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const NetworkSchema = new mongoose.Schema(
    {
        name: String,
        slug: String,
        networkProvider: {
            type: Schema.Types.ObjectId,
            ref: 'NetworkProvider',
        },
        networkType: String,
    },
    { timestamps: true },
);
