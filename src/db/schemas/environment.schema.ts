import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const EnvironmentSchema = new mongoose.Schema(
    {
        name: String,
        slug: String,
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
        },
    },
    { timestamps: true },
);
