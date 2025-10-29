import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from '@kuku/backend/api/routes/auth.controller';
import { AuthService } from '@kuku/backend/services/auth/auth.service';
import { UsersController } from '@kuku/backend/api/routes/users.controller';
import { AuthMiddleware } from '@kuku/backend/services/auth/auth.middleware';
import { StripeController } from '@kuku/backend/api/routes/stripe.controller';
import { StripeService } from '@kuku/nestjs-libraries/services/stripe.service';
import { AnalyticsController } from '@kuku/backend/api/routes/analytics.controller';
import { PoliciesGuard } from '@kuku/backend/services/auth/permissions/permissions.guard';
import { PermissionsService } from '@kuku/backend/services/auth/permissions/permissions.service';
import { IntegrationsController } from '@kuku/backend/api/routes/integrations.controller';
import { IntegrationManager } from '@kuku/nestjs-libraries/integrations/integration.manager';
import { SettingsController } from '@kuku/backend/api/routes/settings.controller';
import { PostsController } from '@kuku/backend/api/routes/posts.controller';
import { MediaController } from '@kuku/backend/api/routes/media.controller';
import { UploadModule } from '@kuku/nestjs-libraries/upload/upload.module';
import { BillingController } from '@kuku/backend/api/routes/billing.controller';
import { NotificationsController } from '@kuku/backend/api/routes/notifications.controller';
import { MarketplaceController } from '@kuku/backend/api/routes/marketplace.controller';
import { MessagesController } from '@kuku/backend/api/routes/messages.controller';
import { OpenaiService } from '@kuku/nestjs-libraries/openai/openai.service';
import { ExtractContentService } from '@kuku/nestjs-libraries/openai/extract.content.service';
import { CodesService } from '@kuku/nestjs-libraries/services/codes.service';
import { CopilotController } from '@kuku/backend/api/routes/copilot.controller';
import { AgenciesController } from '@kuku/backend/api/routes/agencies.controller';
import { PublicController } from '@kuku/backend/api/routes/public.controller';
import { RootController } from '@kuku/backend/api/routes/root.controller';
import { TrackService } from '@kuku/nestjs-libraries/track/track.service';
import { ShortLinkService } from '@kuku/nestjs-libraries/short-linking/short.link.service';
import { Nowpayments } from '@kuku/nestjs-libraries/crypto/nowpayments';
import { WebhookController } from '@kuku/backend/api/routes/webhooks.controller';
import { SignatureController } from '@kuku/backend/api/routes/signature.controller';
import { AutopostController } from '@kuku/backend/api/routes/autopost.controller';
import { SetsController } from '@kuku/backend/api/routes/sets.controller';
import { ThirdPartyController } from '@kuku/backend/api/routes/third-party.controller';
import { MonitorController } from '@kuku/backend/api/routes/monitor.controller';

const authenticatedController = [
  UsersController,
  AnalyticsController,
  IntegrationsController,
  SettingsController,
  PostsController,
  MediaController,
  BillingController,
  NotificationsController,
  MarketplaceController,
  MessagesController,
  CopilotController,
  AgenciesController,
  WebhookController,
  SignatureController,
  AutopostController,
  SetsController,
  ThirdPartyController,
];
@Module({
  imports: [UploadModule],
  controllers: [
    RootController,
    StripeController,
    AuthController,
    PublicController,
    MonitorController,
    ...authenticatedController,
  ],
  providers: [
    AuthService,
    StripeService,
    OpenaiService,
    ExtractContentService,
    AuthMiddleware,
    PoliciesGuard,
    PermissionsService,
    CodesService,
    IntegrationManager,
    TrackService,
    ShortLinkService,
    Nowpayments,
  ],
  get exports() {
    return [...this.imports, ...this.providers];
  },
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(...authenticatedController);
  }
}
