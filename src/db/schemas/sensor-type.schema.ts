import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SensorType as TypeOfSensor } from '../../types';

@Schema({ timestamps: true })
export class SensorType extends Document {
  @Prop()
  name: TypeOfSensor;
}

export const SensorTypeSchema = SchemaFactory.createForClass(SensorType);
