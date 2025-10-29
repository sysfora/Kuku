import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Organization } from '@prisma/client';
import { GetOrgFromRequest } from '@kuku/nestjs-libraries/user/org.from.request';
import { StarsService } from '@kuku/nestjs-libraries/database/prisma/stars/stars.service';
import dayjs from 'dayjs';
import { StarsListDto } from '@kuku/nestjs-libraries/dtos/analytics/stars.list.dto';
import { ApiTags } from '@nestjs/swagger';
import { IntegrationService } from '@kuku/nestjs-libraries/database/prisma/integrations/integration.service';
import { IntegrationManager } from '@kuku/nestjs-libraries/integrations/integration.manager';

@ApiTags('Analytics')
@Controller('/analytics')
export class AnalyticsController {
  constructor(
    private _starsService: StarsService,
    private _integrationService: IntegrationService
  ) {}
  @Get('/')
  async getStars(@GetOrgFromRequest() org: Organization) {
    return this._starsService.getStars(org.id);
  }

  @Get('/trending')
  async getTrending() {
    const todayTrending = dayjs(dayjs().format('YYYY-MM-DDT12:00:00'));
    const last = todayTrending.isAfter(dayjs())
      ? todayTrending.subtract(1, 'day')
      : todayTrending;
    const nextTrending = last.add(1, 'day');

    return {
      last: last.format('YYYY-MM-DD HH:mm:ss'),
      predictions: nextTrending.format('YYYY-MM-DD HH:mm:ss'),
    };
  }

  @Post('/stars')
  async getStarsFilter(
    @GetOrgFromRequest() org: Organization,
    @Body() starsFilter: StarsListDto
  ) {
    return {
      stars: await this._starsService.getStarsFilter(org.id, starsFilter),
    };
  }

  @Get('/:integration')
  async getIntegration(
    @GetOrgFromRequest() org: Organization,
    @Param('integration') integration: string,
    @Query('date') date: string
  ) {
    return this._integrationService.checkAnalytics(org, integration, date);
  }
}
