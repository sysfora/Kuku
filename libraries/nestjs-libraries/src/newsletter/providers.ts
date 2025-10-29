import { BeehiivProvider } from '@kuku/nestjs-libraries/newsletter/providers/beehiiv.provider';
import { EmailEmptyProvider } from '@kuku/nestjs-libraries/newsletter/providers/email-empty.provider';
import { ListmonkProvider } from '@kuku/nestjs-libraries/newsletter/providers/listmonk.provider';

export const newsletterProviders = [
  new BeehiivProvider(),
  new ListmonkProvider(),
  new EmailEmptyProvider(),
];
