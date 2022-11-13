import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PostsController from './posts.controller';
import PostsService from './posts.service';
import { Post, PostSchema, postForFeature } from './post.schema';

@Module({
  imports: [MongooseModule.forFeature([postForFeature])],
  controllers: [PostsController],
  providers: [PostsService],
})
class PostsModule {}

export default PostsModule;
