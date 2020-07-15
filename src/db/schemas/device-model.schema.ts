import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { NetworkType } from '../../types';

@Schema({ timestamps: true })
export class DeviceModel extends Document {
  @Prop()
  name: string;

  @Prop()
  manufacturer: { type: MongooseSchema.Types.ObjectId; ref: 'DeviceModel' };

  @Prop()
  tags: { type: MongooseSchema.Types.ObjectId; ref: 'DeviceTag' };

  @Prop()
  networkTypes: NetworkType[];
}

export const DeviceModelSchema = SchemaFactory.createForClass(DeviceModel);
