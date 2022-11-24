import { Module } from '@nestjs/common';
import { SecondServiceController } from './second-service.controller';
import { SecondServiceService } from './second-service.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_CLIENT',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'],
        },
      },
    ]),
  ],
  controllers: [SecondServiceController],
  providers: [SecondServiceService],
})
class SecondServiceModule {}

export default SecondServiceModule;
