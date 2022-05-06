import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';

import { AugmentedNatsTransport } from './augmented-nats-transport';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    strategy: new AugmentedNatsTransport({
      servers: ['nats://nats:4222'],
    }),
  });

  app.setBaseViewsDir(join(__dirname, '..', 'templates'));
  app.setViewEngine('pug');

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
