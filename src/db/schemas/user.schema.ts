import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  customer: {
    type: MongooseSchema.Types.ObjectId;
    ref: 'Customer';
  };

  @Prop()
  environments: [
    {
      environment: {
        type: MongooseSchema.Types.ObjectId;
        ref: 'Environment';
      };
      roles: [{ type: 'String' }];
    },
  ];
}

export const UserSchema = SchemaFactory.createForClass(User);
