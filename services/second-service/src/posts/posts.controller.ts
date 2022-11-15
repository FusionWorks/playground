import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import PostsService from './posts.service';
import ParamsWithId from '../utils/paramsWithId';
import CreatePostsDto from './dto/create-posts.dto';
import { plainToClass } from '@nestjs/class-transformer';
import { PostsDto } from './dto/posts.dto';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts() {
    const allPosts = await this.postsService.findAll();

    return plainToClass(PostsDto, allPosts, { excludeExtraneousValues: true });
  }

  @Get(':id')
  async getPost(@Param() { id }: ParamsWithId) {
    const postById = await this.postsService.findOne(id);

    return plainToClass(PostsDto, postById, { excludeExtraneousValues: true });
  }

  @Post()
  async createPost(@Body() post: CreatePostsDto) {
    const newPost = await this.postsService.create(post);

    return plainToClass(PostsDto, newPost, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  async deletePost(@Param() { id }: ParamsWithId) {
    return this.postsService.delete(id);
  }

  @Put(':id')
  async updatePost(
    @Param() { id }: ParamsWithId,
    @Body() post: CreatePostsDto,
  ) {
    const updatedPost = await this.postsService.update(id, post);

    return plainToClass(PostsDto, updatedPost, {
      excludeExtraneousValues: true,
    });
  }
}
