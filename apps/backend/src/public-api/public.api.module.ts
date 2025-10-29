import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from '@kuku/backend/services/auth/auth.service';
import { StripeService } from '@kuku/nestjs-libraries/services/stripe.service';
import { PoliciesGuard } from '@kuku/backend/services/auth/permissions/permissions.guard';
import { PermissionsService } from '@kuku/backend/services/auth/permissions/permissions.service';
import { IntegrationManager } from '@kuku/nestjs-libraries/integrations/integration.manager';
import { UploadModule } from '@kuku/nestjs-libraries/upload/upload.module';
import { OpenaiService } from '@kuku/nestjs-libraries/openai/openai.service';
import { ExtractContentService } from '@kuku/nestjs-libraries/openai/extract.content.service';
import { CodesService } from '@kuku/nestjs-libraries/services/codes.service';
import { PublicIntegrationsController } from '@kuku/backend/public-api/routes/v1/public.integrations.controller';
import { PublicAuthMiddleware } from '@kuku/backend/services/auth/public.auth.middleware';

const authenticatedController = [PublicIntegrationsController];
@Module({
  imports: [UploadModule],
  controllers: [...authenticatedController],
  providers: [
    AuthService,
    StripeService,
    OpenaiService,
    ExtractContentService,
    PoliciesGuard,
    PermissionsService,
    CodesService,
    IntegrationManager,
  ],
  get exports() {
    return [...this.imports, ...this.providers];
  },
})
export class PublicApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PublicAuthMiddleware).forRoutes(...authenticatedController);
  }
}

