import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const DocumentSchema = new mongoose.Schema({
  title: String,
  body: String,
  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'Resource'
  }]
},{ timestamps: true });
