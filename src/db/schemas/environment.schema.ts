import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Environment extends Document {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  customer: {
    type: MongooseSchema.Types.ObjectId;
    ref: 'Customer';
  };
}

export const EnvironmentSchema = SchemaFactory.createForClass(Environment);
