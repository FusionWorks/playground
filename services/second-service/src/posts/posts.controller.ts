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
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreatePostsDto from './dto/create-posts.dto';
import ParamsWithId from '../utils/paramsWithId';
import UpdatePostDto from './dto/update-post.dto';
import { UpdatePostsDto } from './dto/update-posts.dto';
import { TransformPlainToClass } from '@nestjs/class-transformer';
import { GetPostsDto, PostsDto } from './dto/posts.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { swaggerConfig } from '../swagger.config';

import { TransformPaginationResponseInterceptor } from '../common/interceptors';

@ApiTags('Posts')
@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  @UseInterceptors(new TransformPaginationResponseInterceptor(PostsDto, { excludeExtraneousValues: true }))
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
  @ApiBody({ type: CreatePostsDto })
  @ApiBody(swaggerConfig.body)
  @TransformPlainToClass(PostsDto, { excludeExtraneousValues: true })
  async createPost(@Body() post: CreatePostsDto) {
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
  @TransformPlainToClass(UpdatePostsDto, { excludeExtraneousValues: true })
  async updatePost(
    @Param() { id }: ParamsWithId,
    @Body() post: CreatePostsDto,
  ) {
    return this.postsService.update(id, post);
  }

  @swaggerConfig.param.id
  @ApiBody(swaggerConfig.body)
  @Patch(':id')
  @TransformPlainToClass(UpdatePostsDto, { excludeExtraneousValues: true })
  async partialUpdatePost(
    @Param() { id }: ParamsWithId,
    @Body() post: UpdatePostDto,
  ) {
    return this.postsService.partialUpdate(id, post);
  }
}
