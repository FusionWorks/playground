import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SchedulerRegistry, Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly startUpTime = new Date();

  constructor(
    private readonly scheduler: SchedulerRegistry,
    @Inject('NATS_CLIENT')
    private readonly natsClient: ClientProxy,
  ) {}

  @Cron('*/5 * * * * *', { name: 'Uptime check' })
  doThingsEvery5Seconds() {
    const now = new Date();
    const upTime = now.getTime() - this.startUpTime.getTime();

    this.natsClient.emit('cron.service-status', { upTime });
  }

  getScheduledJobs() {
    const cronJobs = this.scheduler.getCronJobs().values();
    const cronJobsDTO = [...cronJobs].map((job: any) => ({
      time: job.cronTime.source,
      lastExecution: job.lastExecution,
    }));

    return cronJobsDTO;
  }
}
