import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class DeviceTag extends Document {
  @Prop()
  name: string;

  @Prop()
  slug: string;
}

export const DeviceTagSchema = SchemaFactory.createForClass(DeviceTag);
