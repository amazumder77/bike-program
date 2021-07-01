import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Query, Put, Post, Param } from '@nestjs/common';
import { BikingEventRegistrationService } from './biking-event-registration.service';
import { BikingEventRegistrationDto } from './dto/biking-event-registration.dto';
import { SearchBikingEventRegistrationQueryDto } from './dto/search-biking-event-registration.dto';
import { PaginatedResponse } from '../../shared/pagination/paginated-response.interface';
import {
  BikingEventRegistrationRO,
  SearchBikingEventRegistrationRO,
} from './interfaces/biking-event-registration.interface';

@Controller('v1/biking-event-registration')
export class BikingEventRegistrationController {
  constructor(private readonly bikingEventRegistrationService: BikingEventRegistrationService) {}

  @Post()
  async registerInEvent(
    @Body() bikingEventRegistrationDto: BikingEventRegistrationDto,
  ): Promise<BikingEventRegistrationRO> {
    return await this.bikingEventRegistrationService.registerInEvent(bikingEventRegistrationDto);
  }

  @Get('/find/:uuid')
  async getRegistrationByUuid(@Param('uuid') uuid: string): Promise<BikingEventRegistrationRO> {
    return await this.bikingEventRegistrationService.getRegistrationByUuid(uuid);
  }

  @Put('/:uuid')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('uuid') uuid: string,
    @Body() bikingEventRegistrationDto: BikingEventRegistrationDto,
  ): Promise<BikingEventRegistrationRO> {
    return await this.bikingEventRegistrationService.update(uuid, bikingEventRegistrationDto);
  }

  @Delete('/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRegistrationByUuid(@Param('uuid') uuid: string): Promise<void> {
    await this.bikingEventRegistrationService.deleteRegistrationByUuid(uuid);
  }

  @Get('/search')
  @HttpCode(HttpStatus.OK)
  async search(
    @Query() query: SearchBikingEventRegistrationQueryDto,
  ): Promise<PaginatedResponse<SearchBikingEventRegistrationRO>> {
    return await this.bikingEventRegistrationService.search(query);
  }
}
