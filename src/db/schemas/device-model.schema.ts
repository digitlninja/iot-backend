import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const DeviceModelSchema = new mongoose.Schema(
  {
    name: String,
    manufacturer: { type: Schema.Types.ObjectId, ref: 'DeviceModel' },
    tags: { type: Schema.Types.ObjectId, ref: 'DeviceTag' },
    networkTypes: String,
  },
  { timestamps: true },
);
