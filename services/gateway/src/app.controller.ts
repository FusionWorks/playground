import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Observable<string> {
    console.log('Gateway GET Hello');

    return this.appService.getHello();
  }
}
