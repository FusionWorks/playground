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
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreatePostsDto from './dto/create-posts.dto';
import ParamsWithId from '../utils/paramsWithId';
import UpdatePostDto from './dto/update-post.dto';
import { UpdatePostsDto } from './dto/update-posts.dto';
import { plainToClass, TransformPlainToClass } from '@nestjs/class-transformer';
import { GetPostsDto, PostsDto, PostsWithPaginationDto } from './dto/posts.dto';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @TransformPlainToClass(PostsWithPaginationDto, {
    excludeExtraneousValues: true,
  })
  @UsePipes(new ValidationPipe())
  async getAllPosts(@Query() query: GetPostsDto) {
    const { limit, offset } = query;
    const posts = await this.postsService.findAll(limit, offset);
    const total = await this.postsService.countDocuments();

    return {
      data: await Promise.all(
        posts.map((post) => plainToClass(PostsDto, post)),
      ),
      meta: {
        total,
        limit: Number(limit),
        offset: Number(offset),
      },
    };
  }

  @Get(':id')
  @TransformPlainToClass(PostsDto, { excludeExtraneousValues: true })
  async getPostById(@Param() { id }: ParamsWithId) {
    return this.postsService.findOne(id);
  }

  @Post()
  @TransformPlainToClass(PostsDto, { excludeExtraneousValues: true })
  async createPost(@Body() post: CreatePostsDto) {
    return this.postsService.create(post);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: ParamsWithId) {
    return this.postsService.delete(id);
  }

  @Put(':id')
  @TransformPlainToClass(UpdatePostsDto, { excludeExtraneousValues: true })
  async updatePost(
    @Param() { id }: ParamsWithId,
    @Body() post: CreatePostsDto,
  ) {
    return this.postsService.update(id, post);
  }

  @Patch(':id')
  @TransformPlainToClass(UpdatePostsDto, { excludeExtraneousValues: true })
  async partialUpdatePost(
    @Param() { id }: ParamsWithId,
    @Body() post: UpdatePostDto,
  ) {
    return this.postsService.partialUpdate(id, post);
  }
}
