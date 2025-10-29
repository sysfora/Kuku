import { initializeSentry } from '@kuku/nestjs-libraries/sentry/initialize.sentry';
initializeSentry('workers');

import { NestFactory } from '@nestjs/core';

import { MicroserviceOptions } from '@nestjs/microservices';
import { BullMqServer } from '@kuku/nestjs-libraries/bull-mq-transport-new/strategy';

import { AppModule } from './app/app.module';

async function bootstrap() {
  process.env.IS_WORKER = 'true';

  // some comment again
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      strategy: new BullMqServer(),
    }
  );

  await app.listen();
}

bootstrap();
