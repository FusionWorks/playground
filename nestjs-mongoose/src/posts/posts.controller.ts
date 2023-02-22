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
import ParamsWithId from '../utils/paramsWithId';
import { UpdatePostDto, CreatePostDto } from './dto/create-update-posts.dto';
import { TransformPlainToClass } from '@nestjs/class-transformer';
import { GetPostsDto, PostsDto } from './dto/posts.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { swaggerConfig } from '../swagger.config';

import { TransformPaginationResponse } from '../common/pagination/transform-pagination-response.decorator';

@ApiTags('Posts')
@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  @TransformPaginationResponse(PostsDto, { excludeExtraneousValues: true })
  async getAllPosts(@Query() query: GetPostsDto) {
    return this.postsService.findAll(query);
  }

  @swaggerConfig.param.id
  @Get(':id')
  @TransformPlainToClass(PostsDto, { excludeExtraneousValues: true })
  async getPostById(@Param() { id }: ParamsWithId) {
    return this.postsService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreatePostDto })
  @ApiBody(swaggerConfig.body)
  @TransformPlainToClass(PostsDto, { excludeExtraneousValues: true })
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
  @TransformPlainToClass(PostsDto, { excludeExtraneousValues: true })
  async updatePost(@Param() { id }: ParamsWithId, @Body() post: CreatePostDto) {
    return this.postsService.update(id, post);
  }

  @swaggerConfig.param.id
  @ApiBody(swaggerConfig.body)
  @Patch(':id')
  @TransformPlainToClass(PostsDto, { excludeExtraneousValues: true })
  async partialUpdatePost(
    @Param() { id }: ParamsWithId,
    @Body() post: UpdatePostDto,
  ) {
    return this.postsService.partialUpdate(id, post);
  }
}
