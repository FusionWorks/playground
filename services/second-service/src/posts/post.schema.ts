import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Document } from 'mongoose';

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ default: now() })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);

export type PostDocument = Post & Document;

export const postForFeature = {
  name: Post.name,
  schema: PostSchema,
};
