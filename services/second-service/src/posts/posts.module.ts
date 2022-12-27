import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PostsController from './posts.controller';
import PostsService from './posts.service';
import { postForFeature } from './post.schema';
import { PostsDto } from './dto/posts.dto';
import { CLASS_TRANSFORM_DTO } from '../constants';

@Module({
  imports: [MongooseModule.forFeature([postForFeature])],
  controllers: [PostsController],
  providers: [
    PostsService,
    {
      provide: CLASS_TRANSFORM_DTO,
      useValue: PostsDto,
    },
  ],
})
class PostsModule {}

export default PostsModule;
