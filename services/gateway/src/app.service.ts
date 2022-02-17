import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('NATS_CLIENT')
    private natsClient: ClientProxy,
  ) {}

  getHello(): Observable<string> {
    return this.natsClient.send('hello', {});
  }
}
