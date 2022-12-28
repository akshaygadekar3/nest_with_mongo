import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Auth } from 'src/auth/schema/auth.schema';
import { TaskStatus } from '../taskStatus.enum';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  status: TaskStatus;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Auth.name,
  })
  // @Type(() => Auth)
  // @Exclude()
  @ExcludeProperty()
  user: Auth;

  // timestamp: true
}

export const TaskSchema = SchemaFactory.createForClass(Task);
