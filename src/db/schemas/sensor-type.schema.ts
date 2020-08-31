import * as mongoose from 'mongoose';

export const SensorTypeSchema = new mongoose.Schema(
    {
        name: String,
    },
    { timestamps: true },
);
