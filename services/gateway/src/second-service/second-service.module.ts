import { Module } from '@nestjs/common';
import { SeconsServiceController } from './second-service.controller';
import { SecondServiceService } from './second-service.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
        {
          name: 'NATS_CLIENT',
          transport: Transport.NATS,
          options: {
            servers: ['nats://localhost:4222'],
          },
        },
      ]),
  ],
  controllers: [SeconsServiceController],
  providers: [SecondServiceService],
})
class SecondServiceModule {}

export default SecondServiceModule;
