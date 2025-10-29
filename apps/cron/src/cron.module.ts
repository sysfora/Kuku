import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '@kuku/nestjs-libraries/database/prisma/database.module';
import { BullMqModule } from '@kuku/nestjs-libraries/bull-mq-transport-new/bull.mq.module';
import { SentryModule } from '@sentry/nestjs/setup';
import { FILTER } from '@kuku/nestjs-libraries/sentry/sentry.exception';
import { CheckMissingQueues } from '@kuku/cron/tasks/check.missing.queues';
import { PostNowPendingQueues } from '@kuku/cron/tasks/post.now.pending.queues';

@Module({
  imports: [
    SentryModule.forRoot(),
    DatabaseModule,
    ScheduleModule.forRoot(),
    BullMqModule,
  ],
  controllers: [],
  providers: [FILTER, CheckMissingQueues, PostNowPendingQueues],
})
export class CronModule {}
