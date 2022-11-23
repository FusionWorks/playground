import { Controller } from '@nestjs/common';
import PostsService from './posts.service';
import { plainToClass } from '@nestjs/class-transformer';
import { PostsDto } from './dto/posts.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostBody } from '../types/posts';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @MessagePattern('get-posts')
  async getAllPosts() {
    const allPosts = await this.postsService.findAll();

    return plainToClass(PostsDto, allPosts, { excludeExtraneousValues: true });
  }

  @MessagePattern('get-post')
  async getPostById(@Payload() id: string) {
    const postById = await this.postsService.findOne(id);

    return plainToClass(PostsDto, postById, { excludeExtraneousValues: true });
  }

  @MessagePattern('create-post')
  async createPost(@Payload() post: PostBody) {
    const newPost = await this.postsService.create(post);

    return plainToClass(PostsDto, newPost, { excludeExtraneousValues: true });
  }

  @MessagePattern('delete-post')
  async deletePost(@Payload() id: string) {
    return this.postsService.delete(id);
  }

  @MessagePattern('update-post')
  async updatePost(@Payload() { id, post }: { id: string; post: PostBody }) {
    const updatedPost = await this.postsService.update(id, post);

    return plainToClass(PostsDto, updatedPost, {
      excludeExtraneousValues: true,
    });
  }
}
