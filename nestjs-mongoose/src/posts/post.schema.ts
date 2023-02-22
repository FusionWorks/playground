import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuditableEntity } from '../common/schema/auditable-entity.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post extends AuditableEntity {
  @Prop()
  title: string;

  @Prop()
  content: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);

export const postForFeature = {
  name: Post.name,
  schema: PostSchema,
};
