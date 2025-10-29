import { Module } from '@nestjs/common';
import { CommandModule as ExternalCommandModule } from 'nestjs-command';
import { CheckStars } from './tasks/check.stars';
import { DatabaseModule } from '@kuku/nestjs-libraries/database/prisma/database.module';
import { RefreshTokens } from './tasks/refresh.tokens';
import { BullMqModule } from '@kuku/nestjs-libraries/bull-mq-transport-new/bull.mq.module';
import { ConfigurationTask } from './tasks/configuration';
import { AgentRun } from './tasks/agent.run';
import { AgentModule } from '@kuku/nestjs-libraries/agent/agent.module';

@Module({
  imports: [ExternalCommandModule, DatabaseModule, BullMqModule, AgentModule],
  controllers: [],
  providers: [CheckStars, RefreshTokens, ConfigurationTask, AgentRun],
  get exports() {
    return [...this.imports, ...this.providers];
  },
})
export class CommandModule {}
