import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Auth } from 'src/auth/schema/auth.schema';
import { TaskStatus } from '../taskStatus.enum';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';
import { ApiProperty } from '@nestjs/swagger';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @ApiProperty({example: "Title"})
  @Prop({ required: true })
  title: string;

  @ApiProperty({example: "Description"})
  @Prop({ required: true })
  description: string;

  @ApiProperty({example: "Status"})
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
