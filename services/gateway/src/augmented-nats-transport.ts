import {
  CustomTransportStrategy,
  ServerNats,
  NatsOptions,
} from '@nestjs/microservices';
import { Client } from '@nestjs/microservices/external/nats-client.interface';

/**
 * Extends default NestJS NATS integration by adding the queue
 * to each {@link EventPattern}/{@link MessagePattern} individually,
 * to the {@link EventPattern.extras} parameter
 */
export class AugmentedNatsTransport extends ServerNats implements CustomTransportStrategy {
  constructor(private readonly exposedOptions: NatsOptions['options']) {
    super(exposedOptions);
  }

  public bindEvents(client: Client): void {
    const commonQueue = this.getOptionsProp(this.exposedOptions, 'queue');
    const subscribe = (channel: string, individualQueue: string) => {
      this.logger.log(`Subscribing to channel [${channel}], using queue: ${individualQueue}`);

      return client.subscribe(channel, {
        queue: individualQueue,
        callback: this.getMessageHandler(channel).bind(this) as () => void,
      });
    };

    const registeredPatterns = [...this.messageHandlers.keys()];
    registeredPatterns.forEach((channel) => {
      const { extras } = this.messageHandlers.get(channel);
      const individualQueue = extras?.queue as string;

      subscribe(channel, individualQueue ?? commonQueue);
    });
  }
}
