import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const NetworkProviderSchema = new mongoose.Schema(
    {
        name: String,
        slug: String,
    },
    { timestamps: true },
);
