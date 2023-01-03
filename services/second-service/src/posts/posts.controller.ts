import PostsService from './posts.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import CreatePostsDto from './dto/create-posts.dto';
import ParamsWithId from '../utils/paramsWithId';
import UpdatePostDto from './dto/update-post.dto';
import { ResponseTransformInterceptor } from '../app.interceptor';
import { UpdatePostsDto } from './dto/update-posts.dto';

@Controller('posts')
@UseInterceptors(ResponseTransformInterceptor)
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async getPostById(@Param() { id }: ParamsWithId) {
    return this.postsService.findOne(id);
  }

  @Post()
  async createPost(@Body() post: CreatePostsDto) {
    return this.postsService.create(post);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: ParamsWithId) {
    return this.postsService.delete(id);
  }

  @UseInterceptors(new ResponseTransformInterceptor(UpdatePostsDto))
  @Put(':id')
  async updatePost(
    @Param() { id }: ParamsWithId,
    @Body() post: CreatePostsDto,
  ) {
    return this.postsService.update(id, post);
  }

  @UseInterceptors(new ResponseTransformInterceptor(UpdatePostsDto))
  @Patch(':id')
  async partialUpdatePost(
    @Param() { id }: ParamsWithId,
    @Body() post: UpdatePostDto,
  ) {
    return this.postsService.partialUpdate(id, post);
  }
}
