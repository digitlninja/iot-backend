import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { NetworkType } from '../../types';

@Schema({ timestamps: true })
export class Network extends Document {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  networkProvider: {
    type: MongooseSchema.Types.ObjectId;
    ref: 'NetworkProvider';
  };

  @Prop()
  networkType: NetworkType;
}

export const NetworkSchema = SchemaFactory.createForClass(Network);
