import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventOrganizer } from './event-organizers.entity';
import { EventOrganizerRepository } from './event-organizers.repository';

import { SearchEventOrganizersQueryDto } from './dto/search-event-organizers.dto';
import { PaginatedResponse } from '../../shared/pagination/paginated-response.interface';
import { In } from 'typeorm';
import { EventOrganizersDto } from './dto/event-organizers.dto';
import { EventOrganizersRO, SearchEventOrganizersRO } from './interfaces/event-organizers.interface';

@Injectable()
export class EventOrganizersService {
  constructor(
    @InjectRepository(EventOrganizer)
    private readonly eventOrganizerRepository: EventOrganizerRepository,
  ) { }

  async addOrganizerToEvent(eventOrganizersDto: EventOrganizersDto): Promise<EventOrganizersRO> {
    const { uuid } = await this.eventOrganizerRepository.save(eventOrganizersDto);
    return {
      organizer: {
        uuid,
        ...eventOrganizersDto,
      },
    };
  }

  async search(
    query: SearchEventOrganizersQueryDto,
  ): Promise<PaginatedResponse<SearchEventOrganizersRO>> {
    const [event_organizers, total]: [Array<EventOrganizer>, number] =
      await this.eventOrganizerRepository.findAndCount({
        where: {
          ...(query?.event_ids && { event_id: In([...query.event_ids]) }),
        },
      });
    return {
      organizers: event_organizers,
      count: event_organizers?.length,
      offset: query?.offset,
      total,
    } as PaginatedResponse<SearchEventOrganizersRO>;
  }

  async getEventOrganizerByUuid(uuid: string): Promise<EventOrganizersRO> {
    const {
      event_id,
      first_name,
      last_name,
      phone,
      email,
      company,
      company_phone,
      is_primary_contact,
      is_tenant,
      is_verified,
      has_building_access,
    } = await this.eventOrganizerRepository.findOne({ uuid });
    return {
      organizer: {
        uuid,
        event_id,
        first_name,
        last_name,
        phone,
        email,
        company,
        company_phone,
        is_primary_contact,
        is_tenant,
        is_verified,
        has_building_access,
      },
    };
  }

  async update(
    uuid: string,
    eventOrganizerDto: EventOrganizersDto,
  ): Promise<EventOrganizersRO> {
    const eventOrganizer: EventOrganizer = await this.eventOrganizerRepository.findOne({
      uuid,
    });
    await this.eventOrganizerRepository.save({
      id: eventOrganizer.id,
      uuid: eventOrganizer.uuid,
      ...eventOrganizerDto,
    });
    return {
      organizer: {
        uuid: eventOrganizer.uuid,
        ...eventOrganizerDto,
      },
    };
  }

  async deleteOrganizerByUuid(uuid: string): Promise<void> {
    await this.eventOrganizerRepository.softDelete({ uuid });
  }
}
