import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Document } from 'mongoose';

export type VoteDocument = Vote & Document;

@Schema()
export class Vote {
  @Prop({type: Object})
  topicId: object;

  @Prop({type: ObjectId})
  optionId: ObjectId;

  @Prop()
  username: string;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);