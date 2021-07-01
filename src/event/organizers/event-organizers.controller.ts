import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Query, Put, Post, Param } from '@nestjs/common';
import { EventOrganizersService } from './event-organizers.service';
import { EventOrganizersDto } from './dto/event-organizers.dto';
import { SearchEventOrganizersQueryDto } from './dto/search-event-organizers.dto';
import { PaginatedResponse } from '../../shared/pagination/paginated-response.interface';
import { EventOrganizersRO, SearchEventOrganizersRO } from './interfaces/event-organizers.interface';

@Controller('v1/event-organizers')
export class EventOrganizersController {
  constructor(private readonly bikingEventRegistrationService: EventOrganizersService) { }

  @Post()
  async addOrganizerToEvent(
    @Body() eventOrganizerDto: EventOrganizersDto,
  ): Promise<EventOrganizersRO> {
    return await this.bikingEventRegistrationService.addOrganizerToEvent(eventOrganizerDto);
  }

  @Get('/find/:uuid')
  async getEventOrganizerByUuid(@Param('uuid') uuid: string): Promise<EventOrganizersRO> {
    return await this.bikingEventRegistrationService.getEventOrganizerByUuid(uuid);
  }

  @Put('/:uuid')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('uuid') uuid: string,
    @Body() eventOrganizerDto: EventOrganizersDto,
  ): Promise<EventOrganizersRO> {
    return await this.bikingEventRegistrationService.update(uuid, eventOrganizerDto);
  }

  @Delete('/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrganizerByUuid(@Param('uuid') uuid: string): Promise<void> {
    await this.bikingEventRegistrationService.deleteOrganizerByUuid(uuid);
  }

  @Get('/search')
  @HttpCode(HttpStatus.OK)
  async search(
    @Query() query: SearchEventOrganizersQueryDto,
  ): Promise<PaginatedResponse<SearchEventOrganizersRO>> {
    return await this.bikingEventRegistrationService.search(query);
  }
}
