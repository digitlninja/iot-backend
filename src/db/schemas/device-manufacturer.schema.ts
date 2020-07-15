import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class DeviceManufacturer extends Document {
  @Prop()
  name: string;
}

export const DeviceManufacturerSchema = SchemaFactory.createForClass(
  DeviceManufacturer,
);
