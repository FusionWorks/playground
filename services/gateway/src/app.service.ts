import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Observable } from 'rxjs';

import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway()
export class AppService {
  @WebSocketServer()
  private websocket: Server;

  constructor(
    @Inject('NATS_CLIENT')
    private natsClient: ClientProxy,
  ) {}

  getHello(): Observable<string> {
    return this.natsClient.send('hello', {});
  }

  public getCronJobsList() {
    return this.natsClient.send('cron.list-jobs', {});
  }

  public notifyAllClients(payload: Record<string, any>) {
    this.natsClient.emit('gateway.websocket-broadcast', payload);
  }

  public notifyConnectedClients(payload: Record<string, any>) {
    this.websocket.send(payload);
  }

  public async getSecondServicePosts() {
    return await this.natsClient.send('get-posts', {});
  }

  public async getSecondServicePostById(id: string) {
    return this.natsClient.send('get-post', id);
  }

  public async createSecondServicePost(post: { title: string, content: string }) {
    return this.natsClient.send('create-post', post);
  }

  public async updateSecondServicePost(id: string, post: { title: string, content: string }) {
    return this.natsClient.send('update-post', { id, post });
  }

  public async deleteSecondServicePost(id: string) {
    return this.natsClient.send('delete-post', id);
  }
}
