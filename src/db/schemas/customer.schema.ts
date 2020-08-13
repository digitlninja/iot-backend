import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const CustomerSchema = new mongoose.Schema(
  {
    name: String,
    environments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Environment',
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);
