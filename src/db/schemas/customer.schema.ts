import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Customer extends Document {
  @Prop()
  name: string;

  @Prop()
  environments: [
    {
      type: MongooseSchema.Types.ObjectId;
      ref: 'Environment';
    },
  ];

  @Prop()
  users: [
    {
      type: MongooseSchema.Types.ObjectId;
      ref: 'User';
    },
  ];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
