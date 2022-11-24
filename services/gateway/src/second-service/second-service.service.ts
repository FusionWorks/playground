import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { WebSocketGateway } from '@nestjs/websockets';

@Injectable()
@WebSocketGateway()
export class SecondServiceService {
  constructor(
    @Inject('NATS_CLIENT')
    private natsClient: ClientProxy,
  ) {}
  public async getSecondServicePosts() {
    return this.natsClient.send('get-posts', {});
  }

  public async getSecondServicePostById(id: string) {
    return this.natsClient.send('get-post', id);
  }

  public async createSecondServicePost(post: {
    title: string;
    content: string;
  }) {
    return this.natsClient.send('create-post', post);
  }

  public async updateSecondServicePost(
    id: string,
    post: { title: string; content: string },
  ) {
    return this.natsClient.send('update-post', { id, post });
  }

  public async deleteSecondServicePost(id: string) {
    return this.natsClient.send('delete-post', id);
  }
}
