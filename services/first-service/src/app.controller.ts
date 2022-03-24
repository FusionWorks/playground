import { Controller, Get } from '@nestjs/common';
import { NatsContext, MessagePattern, Payload, Ctx } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('hello')
  getHello(@Payload() data: number[], @Ctx() context: NatsContext) {
    console.log(`Subject: ${context.getSubject()}`); // e.g. "time.us.east"

    return this.appService.getHello();
  }
}
