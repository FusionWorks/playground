import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PostServiceMessages } from '../messages';

@Injectable()
export class PostsService {
  constructor(
    @Inject('NATS_CLIENT')
    private natsClient: ClientProxy,
  ) {}

  public async getPosts() {
    return this.natsClient.send(PostServiceMessages.GET_POSTS, {});
  }

  public async getPostById(id: string) {
    return this.natsClient.send(PostServiceMessages.GET_POST_BY_ID, id);
  }

  public async createPost(post: { title: string; content: string }) {
    return this.natsClient.send(PostServiceMessages.CREATE_POST, post);
  }

  public async updatePost(
    id: string,
    post: { title: string; content: string },
  ) {
    return this.natsClient.send(PostServiceMessages.UPDATE_POST, { id, post });
  }

  public async partialUpdatePost(
    id: string,
    post: { title: string; content: string },
  ) {
    return this.natsClient.send(PostServiceMessages.PARTIAL_UPDATE_POST, {
      id,
      post,
    });
  }

  public async deletePost(id: string) {
    return this.natsClient.send(PostServiceMessages.DELETE_POST, id);
  }
}
