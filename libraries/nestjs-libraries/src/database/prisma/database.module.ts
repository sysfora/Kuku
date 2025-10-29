import { Global, Module } from '@nestjs/common';
import { PrismaRepository, PrismaService, PrismaTransaction } from './prisma.service';
import { OrganizationRepository } from '@kuku/nestjs-libraries/database/prisma/organizations/organization.repository';
import { OrganizationService } from '@kuku/nestjs-libraries/database/prisma/organizations/organization.service';
import { UsersService } from '@kuku/nestjs-libraries/database/prisma/users/users.service';
import { UsersRepository } from '@kuku/nestjs-libraries/database/prisma/users/users.repository';
import { StarsService } from '@kuku/nestjs-libraries/database/prisma/stars/stars.service';
import { StarsRepository } from '@kuku/nestjs-libraries/database/prisma/stars/stars.repository';
import { SubscriptionService } from '@kuku/nestjs-libraries/database/prisma/subscriptions/subscription.service';
import { SubscriptionRepository } from '@kuku/nestjs-libraries/database/prisma/subscriptions/subscription.repository';
import { NotificationService } from '@kuku/nestjs-libraries/database/prisma/notifications/notification.service';
import { IntegrationService } from '@kuku/nestjs-libraries/database/prisma/integrations/integration.service';
import { IntegrationRepository } from '@kuku/nestjs-libraries/database/prisma/integrations/integration.repository';
import { PostsService } from '@kuku/nestjs-libraries/database/prisma/posts/posts.service';
import { PostsRepository } from '@kuku/nestjs-libraries/database/prisma/posts/posts.repository';
import { IntegrationManager } from '@kuku/nestjs-libraries/integrations/integration.manager';
import { MediaService } from '@kuku/nestjs-libraries/database/prisma/media/media.service';
import { MediaRepository } from '@kuku/nestjs-libraries/database/prisma/media/media.repository';
import { NotificationsRepository } from '@kuku/nestjs-libraries/database/prisma/notifications/notifications.repository';
import { EmailService } from '@kuku/nestjs-libraries/services/email.service';
import { ItemUserRepository } from '@kuku/nestjs-libraries/database/prisma/marketplace/item.user.repository';
import { ItemUserService } from '@kuku/nestjs-libraries/database/prisma/marketplace/item.user.service';
import { MessagesService } from '@kuku/nestjs-libraries/database/prisma/marketplace/messages.service';
import { MessagesRepository } from '@kuku/nestjs-libraries/database/prisma/marketplace/messages.repository';
import { StripeService } from '@kuku/nestjs-libraries/services/stripe.service';
import { ExtractContentService } from '@kuku/nestjs-libraries/openai/extract.content.service';
import { OpenaiService } from '@kuku/nestjs-libraries/openai/openai.service';
import { AgenciesService } from '@kuku/nestjs-libraries/database/prisma/agencies/agencies.service';
import { AgenciesRepository } from '@kuku/nestjs-libraries/database/prisma/agencies/agencies.repository';
import { TrackService } from '@kuku/nestjs-libraries/track/track.service';
import { ShortLinkService } from '@kuku/nestjs-libraries/short-linking/short.link.service';
import { WebhooksRepository } from '@kuku/nestjs-libraries/database/prisma/webhooks/webhooks.repository';
import { WebhooksService } from '@kuku/nestjs-libraries/database/prisma/webhooks/webhooks.service';
import { SignatureRepository } from '@kuku/nestjs-libraries/database/prisma/signatures/signature.repository';
import { SignatureService } from '@kuku/nestjs-libraries/database/prisma/signatures/signature.service';
import { AutopostRepository } from '@kuku/nestjs-libraries/database/prisma/autopost/autopost.repository';
import { AutopostService } from '@kuku/nestjs-libraries/database/prisma/autopost/autopost.service';
import { SetsService } from '@kuku/nestjs-libraries/database/prisma/sets/sets.service';
import { SetsRepository } from '@kuku/nestjs-libraries/database/prisma/sets/sets.repository';
import { ThirdPartyRepository } from '@kuku/nestjs-libraries/database/prisma/third-party/third-party.repository';
import { ThirdPartyService } from '@kuku/nestjs-libraries/database/prisma/third-party/third-party.service';
import { VideoManager } from '@kuku/nestjs-libraries/videos/video.manager';
import { FalService } from '@kuku/nestjs-libraries/openai/fal.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    PrismaRepository,
    PrismaTransaction,
    UsersService,
    UsersRepository,
    OrganizationService,
    OrganizationRepository,
    StarsService,
    StarsRepository,
    SubscriptionService,
    SubscriptionRepository,
    NotificationService,
    NotificationsRepository,
    WebhooksRepository,
    WebhooksService,
    IntegrationService,
    IntegrationRepository,
    PostsService,
    PostsRepository,
    StripeService,
    MessagesRepository,
    SignatureRepository,
    AutopostRepository,
    AutopostService,
    SignatureService,
    MediaService,
    MediaRepository,
    ItemUserRepository,
    AgenciesService,
    AgenciesRepository,
    ItemUserService,
    MessagesService,
    IntegrationManager,
    ExtractContentService,
    OpenaiService,
    FalService,
    EmailService,
    TrackService,
    ShortLinkService,
    SetsService,
    SetsRepository,
    ThirdPartyRepository,
    ThirdPartyService,
    VideoManager,
  ],
  get exports() {
    return this.providers;
  },
})
export class DatabaseModule {}
