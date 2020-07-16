import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const UserrSchema = new mongoose.Schema(
  {
    name: String,
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
