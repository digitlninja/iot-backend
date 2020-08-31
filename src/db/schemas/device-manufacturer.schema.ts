import * as mongoose from 'mongoose';

export const DeviceManufacturerSchema = new mongoose.Schema(
    {
        name: String,
    },
    { timestamps: true },
);
