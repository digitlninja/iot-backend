import * as mongoose from 'mongoose';

export const DeviceTagSchema = new mongoose.Schema(
    {
        name: String,
        slug: String,
    },
    { timestamps: true },
);
