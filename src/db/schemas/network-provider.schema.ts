import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class NetworkProvider extends Document {
  @Prop()
  name: string;

  @Prop()
  slug: string;
}

export const NetworkProviderSchema = SchemaFactory.createForClass(
  NetworkProvider,
);
