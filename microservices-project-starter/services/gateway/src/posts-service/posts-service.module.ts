import { Module } from '@nestjs/common';
import { PostsServiceController } from './posts-service.controller';
import { PostsService } from './posts-service.service';
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
  controllers: [PostsServiceController],
  providers: [PostsService],
})
class PostsServiceModule {}

export default PostsServiceModule;
