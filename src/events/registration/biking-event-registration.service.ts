import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BikingEventRegistration } from './biking-event-registration.entity';
import { BikingEventRegistrationRepository } from './biking-event-registration.repository';

import { SearchBikingEventRegistrationQueryDto } from './dto/search-biking-event-registration.dto';
import { PaginatedResponse } from '../../shared/pagination/paginated-response.interface';
import { In } from 'typeorm';
import { BikingEventRegistrationDto } from './dto/biking-event-registration.dto';
import {
  BikingEventRegistrationRO,
  SearchBikingEventRegistrationRO,
} from './interfaces/biking-event-registration.interface';

@Injectable()
export class BikingEventRegistrationService {
  constructor(
    @InjectRepository(BikingEventRegistration)
    private readonly bikingEventRegistrationRepository: BikingEventRegistrationRepository,
  ) { }

  async registerInEvent(bikerEventRegistrationDto: BikingEventRegistrationDto): Promise<BikingEventRegistrationRO> {
    const { uuid } = await this.bikingEventRegistrationRepository.save(bikerEventRegistrationDto);
    return {
      registration: {
        uuid,
        ...bikerEventRegistrationDto,
      },
    };
  }

  async search(
    query: SearchBikingEventRegistrationQueryDto,
  ): Promise<PaginatedResponse<SearchBikingEventRegistrationRO>> {
    const [event_registrations, total]: [Array<BikingEventRegistration>, number] =
      await this.bikingEventRegistrationRepository.findAndCount({
        where: {
          ...(query?.event_ids && { event_id: In([...query.event_ids]) }),
          ...(query?.biker_registration_ids && { biker_registration_id: In([...query.biker_registration_ids]) }),
        },
      });
    return {
      registrations: event_registrations,
      count: event_registrations?.length,
      offset: query?.offset,
      total,
    } as PaginatedResponse<SearchBikingEventRegistrationRO>;
  }

  async getRegistrationByUuid(uuid: string): Promise<BikingEventRegistrationRO> {
    const {
      biker_registration_id,
      event_id,
      is_waiver_signed,
      has_biker_reported,
      has_biker_completed,
      start_time,
      end_time,
    } = await this.bikingEventRegistrationRepository.findOne({ uuid });
    return {
      registration: {
        uuid,
        biker_registration_id,
        event_id,
        is_waiver_signed,
        has_biker_reported,
        has_biker_completed,
        start_time,
        end_time,
      },
    };
  }

  async update(
    uuid: string,
    bikingEventRegistrationDto: BikingEventRegistrationDto,
  ): Promise<BikingEventRegistrationRO> {
    const bikingEventRegistration: BikingEventRegistration = await this.bikingEventRegistrationRepository.findOne({
      uuid,
    });
    await this.bikingEventRegistrationRepository.save({
      id: bikingEventRegistration.id,
      uuid: bikingEventRegistration.uuid,
      ...bikingEventRegistrationDto,
    });
    return {
      registration: {
        uuid: bikingEventRegistration.uuid,
        ...bikingEventRegistrationDto,
      },
    };
  }

  async deleteRegistrationByUuid(uuid: string): Promise<void> {
    await this.bikingEventRegistrationRepository.softDelete({ uuid });
  }
}
