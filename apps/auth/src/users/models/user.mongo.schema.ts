import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongoDocument } from '@app/common';

@Schema({ versionKey: false })
export class UserDocument extends AbstractMongoDocument {
  @Prop()
  email!: string;

  @Prop()
  password!: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
