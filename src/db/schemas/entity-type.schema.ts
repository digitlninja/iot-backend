import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class EntityType extends Document {
  @Prop()
  name: string;

  @Prop()
  isMovable: boolean;
}

export const EntityTypeSchema = SchemaFactory.createForClass(EntityType);
