import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@kuku/nestjs-libraries/database/prisma/database.module';
import { ApiModule } from '@kuku/backend/api/api.module';
import { APP_GUARD } from '@nestjs/core';
import { PoliciesGuard } from '@kuku/backend/services/auth/permissions/permissions.guard';
import { BullMqModule } from '@kuku/nestjs-libraries/bull-mq-transport-new/bull.mq.module';
import { PublicApiModule } from '@kuku/backend/public-api/public.api.module';
import { ThrottlerBehindProxyGuard } from '@kuku/nestjs-libraries/throttler/throttler.provider';
import { ThrottlerModule } from '@nestjs/throttler';
import { AgentModule } from '@kuku/nestjs-libraries/agent/agent.module';
import { ThirdPartyModule } from '@kuku/nestjs-libraries/3rdparties/thirdparty.module';
import { VideoModule } from '@kuku/nestjs-libraries/videos/video.module';
import { SentryModule } from '@sentry/nestjs/setup';
import { FILTER } from '@kuku/nestjs-libraries/sentry/sentry.exception';
import { ChatModule } from '@kuku/nestjs-libraries/chat/chat.module';

@Global()
@Module({
  imports: [
    SentryModule.forRoot(),
    BullMqModule,
    DatabaseModule,
    ApiModule,
    PublicApiModule,
    AgentModule,
    ThirdPartyModule,
    VideoModule,
    ChatModule,
    ThrottlerModule.forRoot([
      {
        ttl: 3600000,
        limit: process.env.API_LIMIT ? Number(process.env.API_LIMIT) : 30,
      },
    ]),
  ],
  controllers: [],
  providers: [
    FILTER,
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
  ],
  exports: [
    BullMqModule,
    DatabaseModule,
    ApiModule,
    PublicApiModule,
    AgentModule,
    ThrottlerModule,
    ChatModule,
  ],
})
export class AppModule {}
