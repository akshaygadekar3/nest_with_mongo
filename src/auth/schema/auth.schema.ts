import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  @ExcludeProperty()
  password: string;

  @Prop({ required: true })
  @ExcludeProperty()
  isActive: boolean;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
