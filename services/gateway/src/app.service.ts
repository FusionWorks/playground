import { Injectable } from '@nestjs/common';
import { Client, Transport, ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  @Client({
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222',
    },
  })
  client: ClientProxy;

  getHello(): Observable<string> {
    return this.client.send('hello', {});
  }
}
