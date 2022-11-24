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

}
