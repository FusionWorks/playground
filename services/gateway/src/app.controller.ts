import { Controller, Get, Render } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';

import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly instanceId = Math.floor(Math.random() * 10);

  private requestsCount = 0;

  constructor(private readonly appService: AppService) {
    console.log('Up!', this.instanceId);
  }

  @Get()
  @Render('index')
  getHello(): Observable<Record<string, any>> {
    console.log('Gateway GET Hello');

    this.incrementCountAndNotify();

    return this.appService.getHello().pipe(
      map((welcomeMessage) => ({
        pageTitle: welcomeMessage,
        instanceId: this.instanceId,
        routes: [
          {
            name: 'Cron jobs list',
            path: '/cron/jobs',
          },
        ],
      })),
    );
  }

  @Get('cron/jobs')
  @Render('cron-list')
  listCronJobs() {
    this.incrementCountAndNotify();

    return this.appService.getCronJobsList().pipe(
      map((jobsList) => ({
        pageTitle: 'Cron List',
        jobs: jobsList,
        instanceId: this.instanceId,
      })),
    );
  }

  @EventPattern('cron.service-status')
  onCronServiceStatus(
    @Payload()
    payload: Record<string, any>,
  ) {
    this.appService.notifyConnectedClients(payload);
  }

  @EventPattern('gateway.websocket-broadcast')
  onWebsocketBroadcast(
    @Payload()
    payload: Record<string, any>,
  ) {
    this.appService.notifyConnectedClients(payload);
  }

  incrementCountAndNotify() {
    this.appService.notifyConnectedClients({
      requests: this.requestsCount++,
    });
  }
}
