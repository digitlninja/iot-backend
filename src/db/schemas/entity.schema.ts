import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Entity extends Document {
  @Prop()
  name: string;

  @Prop()
  environment: { type: MongooseSchema.Types.ObjectId; ref: 'Environment' };

  @Prop()
  entityType: { type: MongooseSchema.Types.ObjectId; ref: 'EntityType' };

  @Prop()
  parentEntity: { type: MongooseSchema.Types.ObjectId; ref: 'Entity' };

  @Prop([String])
  ancestors: string[];
}

export const EntitySchema = SchemaFactory.createForClass(Entity);
