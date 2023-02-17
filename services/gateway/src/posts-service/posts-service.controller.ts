import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts-service.service';
import CreatePostsDto from './dto/create-posts.dto';

@Controller('posts-service')
export class PostsServiceController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts() {
    return this.postsService.getPosts();
  }

  @Get(':id')
  async getPostById(@Param() { id }) {
    return this.postsService.getPostById(id);
  }

  @Post()
  async createPost(@Body() post: CreatePostsDto) {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  async updatePost(@Param() { id }, @Body() post: CreatePostsDto) {
    return this.postsService.updatePost(id, post);
  }

  @Patch(':id')
  async partialUpdatePost(@Param() { id }, @Body() post: CreatePostsDto) {
    return this.postsService.partialUpdatePost(id, post);
  }

  @Delete(':id')
  async deletePost(@Param() { id }) {
    return this.postsService.deletePost(id);
  }
}
