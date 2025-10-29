import { Module } from '@nestjs/common';

import { DatabaseModule } from '@kuku/nestjs-libraries/database/prisma/database.module';
import { PostsController } from '@kuku/workers/app/posts.controller';
import { BullMqModule } from '@kuku/nestjs-libraries/bull-mq-transport-new/bull.mq.module';
import { PlugsController } from '@kuku/workers/app/plugs.controller';
import { SentryModule } from '@sentry/nestjs/setup';
import { FILTER } from '@kuku/nestjs-libraries/sentry/sentry.exception';

@Module({
  imports: [SentryModule.forRoot(), DatabaseModule, BullMqModule],
  controllers: [PostsController, PlugsController],
  providers: [FILTER],
})
export class AppModule {}
