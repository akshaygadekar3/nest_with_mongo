import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @ApiProperty({example: "Username"})
  @Prop({ unique: true, required: true })
  username: string;

  @ApiProperty({example: "Password"})
  @Prop({ required: true })
  @ExcludeProperty()
  password: string;

  @ApiProperty({example: "isActive"})
  @Prop({ required: true })
  @ExcludeProperty()
  isActive: boolean;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
