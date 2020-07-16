import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const EntitySchema = new mongoose.Schema(
  {
    name: String,
    environment: { type: Schema.Types.ObjectId, ref: 'Environment' },
    entityType: { type: Schema.Types.ObjectId, ref: 'EntityType' },
    parentEntity: { type: Schema.Types.ObjectId, ref: 'Entity' },
    ancestors: [],
  },
  { timestamps: true },
);
