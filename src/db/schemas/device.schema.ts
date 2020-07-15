import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Device extends Document {
  @Prop()
  name: string;

  @Prop()
  uuid: string;

  @Prop()
  deviceModel: { type: MongooseSchema.Types.ObjectId; ref: 'DeviceModel' };

  @Prop()
  currentEntity: { type: MongooseSchema.Types.ObjectId; ref: 'Entity' };

  @Prop()
  network: { type: MongooseSchema.Types.ObjectId; ref: 'Network' };

  @Prop()
  networkConfig: Record<string, unknown>;

  @Prop()
  entityAssociations: [
    {
      entity: {
        type: MongooseSchema.Types.ObjectId;
        ref: 'Entity';
      };
      fromTime: [{ type: MongooseSchema.Types.Date }];
      toTime: [{ type: MongooseSchema.Types.Date }];
    },
  ];

  @Prop()
  sensors: Record<string, unknown>[];

  @Prop()
  firstSeenAt: Date;

  @Prop()
  lastSeenAt: Date;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
