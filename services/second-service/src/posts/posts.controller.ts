import PostsService from './posts.service';
import { plainToClass } from '@nestjs/class-transformer';
import { PostsDto } from './dto/posts.dto';
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
import CreatePostsDto from './dto/create-posts.dto';
import ParamsWithId from './utils/paramsWithId';
import UpdatePostDto from './dto/update-post.dto';

@Controller()
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts() {
    const allPosts = await this.postsService.findAll();

    return plainToClass(PostsDto, allPosts, { excludeExtraneousValues: true });
  }

  @Get(':id')
  async getPostById(@Param() { id }: ParamsWithId) {
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
    const deletedPost = await this.postsService.delete(id);

    return plainToClass(PostsDto, deletedPost, {
      excludeExtraneousValues: true,
    });
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

  @Patch(':id')
  async partialUpdatePost(
    @Param() { id }: ParamsWithId,
    @Body() post: UpdatePostDto,
  ) {
    const updatedPost = await this.postsService.partialUpdate(id, post);

    return plainToClass(PostsDto, updatedPost, {
      excludeExtraneousValues: true,
    });
  }
}
