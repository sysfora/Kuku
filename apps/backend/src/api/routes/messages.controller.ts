import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessagesService } from '@kuku/nestjs-libraries/database/prisma/marketplace/messages.service';
import { GetUserFromRequest } from '@kuku/nestjs-libraries/user/user.from.request';
import { Organization, User } from '@prisma/client';
import { AddMessageDto } from '@kuku/nestjs-libraries/dtos/messages/add.message';
import { GetOrgFromRequest } from '@kuku/nestjs-libraries/user/org.from.request';

@ApiTags('Messages')
@Controller('/messages')
export class MessagesController {
  constructor(private _messagesService: MessagesService) {}

  @Get('/')
  getMessagesGroup(
    @GetUserFromRequest() user: User,
    @GetOrgFromRequest() organization: Organization
  ) {
    return this._messagesService.getMessagesGroup(user.id, organization.id);
  }

  @Get('/:groupId/:page')
  getMessages(
    @GetUserFromRequest() user: User,
    @GetOrgFromRequest() organization: Organization,
    @Param('groupId') groupId: string,
    @Param('page') page: string
  ) {
    return this._messagesService.getMessages(
      user.id,
      organization.id,
      groupId,
      +page
    );
  }
  @Post('/:groupId')
  createMessage(
    @GetUserFromRequest() user: User,
    @GetOrgFromRequest() organization: Organization,
    @Param('groupId') groupId: string,
    @Body() message: AddMessageDto
  ) {
    return this._messagesService.createMessage(
      user.id,
      organization.id,
      groupId,
      message
    );
  }
}
