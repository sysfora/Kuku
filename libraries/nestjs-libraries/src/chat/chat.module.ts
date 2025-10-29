import { Global, Module } from '@nestjs/common';
import { LoadToolsService } from '@kuku/nestjs-libraries/chat/load.tools.service';
import { MastraService } from '@kuku/nestjs-libraries/chat/mastra.service';
import { toolList } from '@kuku/nestjs-libraries/chat/tools/tool.list';

@Global()
@Module({
  providers: [MastraService, LoadToolsService, ...toolList],
  get exports() {
    return this.providers;
  },
})
export class ChatModule {}
