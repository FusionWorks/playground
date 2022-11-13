import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHelloNest(): string {
    return 'Hi, your nestJs server is running ok !';
  }
}
