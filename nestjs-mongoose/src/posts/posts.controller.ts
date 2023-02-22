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
} from '@nestjs/common';
import CreatePostDto from './dto/create-post.dto';
import ParamsWithId from '../utils/paramsWithId';
import { PatchPostDto } from './dto/patch-post.dto';
import { TransformPlainToClass } from '@nestjs/class-transformer';
import { PostDto } from './dto/post.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { swaggerConfig } from '../swagger.config';

import { TransformPaginationResponse } from '../common/pagination/transform-pagination-response.decorator';
import UpdatePostDto from './dto/update-post.dto';
import { GetPostsDto } from './dto/get-posts.dto';

@ApiTags('Posts')
@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  @TransformPaginationResponse(PostDto, { excludeExtraneousValues: true })
  async getAllPosts(@Query() query: GetPostsDto) {
    return this.postsService.findAll(query);
  }

  @swaggerConfig.param.id
  @Get(':id')
  @TransformPlainToClass(PostDto, { excludeExtraneousValues: true })
  async getPostById(@Param() { id }: ParamsWithId) {
    return this.postsService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreatePostDto })
  @ApiBody(swaggerConfig.body)
  @TransformPlainToClass(PostDto, { excludeExtraneousValues: true })
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.create(post);
  }

  @swaggerConfig.param.id
  @Delete(':id')
  async deletePost(@Param() { id }: ParamsWithId) {
    return this.postsService.delete(id);
  }

  @swaggerConfig.param.id
  @ApiBody(swaggerConfig.body)
  @Put(':id')
  @TransformPlainToClass(PostDto, { excludeExtraneousValues: true })
  async updatePost(
    @Param() { id }: ParamsWithId,
    @Body() post: UpdatePostDto,
  ) {
    return this.postsService.update(id, post);
  }

  @swaggerConfig.param.id
  @ApiBody(swaggerConfig.body)
  @Patch(':id')
  @TransformPlainToClass(PostDto, { excludeExtraneousValues: true })
  async partialUpdatePost(
    @Param() { id }: ParamsWithId,
    @Body() post: PatchPostDto,
  ) {
    return this.postsService.partialUpdate(id, post);
  }
}
