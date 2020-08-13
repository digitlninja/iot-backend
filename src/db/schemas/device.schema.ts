import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const DeviceSchema = new mongoose.Schema(
  {
    name: String,
    uuid: String,
    deviceModel: { type: Schema.Types.ObjectId, ref: 'DeviceModel' },
    currentEntity: { type: Schema.Types.ObjectId, ref: 'Entity' },
    network: { type: Schema.Types.ObjectId, ref: 'Network' },
    networkConfig: {},
    entityAssociations: [
      {
        entity: {
          type: Schema.Types.ObjectId,
          ref: 'Entity',
        },
        fromTime: { type: Schema.Types.Date },
        toTime: { type: Schema.Types.Date },
      },
    ],
    sensors: [],
    firstSeenAt: Date,
    lastSeenAt: Date,
  },
  { timestamps: true },
);
