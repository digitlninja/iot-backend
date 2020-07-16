import * as mongoose from 'mongoose';

export const EntityTypeSchema = new mongoose.Schema(
  {
    name: String,
    isMovable: Boolean,
  },
  { timestamps: true },
);
