import { Global, Module } from '@nestjs/common';
import { AgentGraphService } from '@kuku/nestjs-libraries/agent/agent.graph.service';
import { AgentGraphInsertService } from '@kuku/nestjs-libraries/agent/agent.graph.insert.service';

@Global()
@Module({
  providers: [AgentGraphService, AgentGraphInsertService],
  get exports() {
    return this.providers;
  },
})
export class AgentModule {}
