import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BikerRegistration } from './biker-registration.entity';
import { BikerRegistrationRepository } from './biker-registration.repository';

import { SearchBikerRegistrationQueryDto } from './dto/search-biker-registration.dto';
import { PaginatedResponse } from '../../shared/pagination/paginated-response.interface';
import { Like } from 'typeorm';
import { BikerRegistrationDto } from './dto/biker-registration.dto';

@Injectable()
export class BikerRegistrationService {
  constructor(
    @InjectRepository(BikerRegistration)
    private readonly bikerRegistrationRepository: BikerRegistrationRepository,
  ) { }

  async registerBiker(bikerRegistrationDto: BikerRegistrationDto): Promise<any> {
    const { uuid } = await this.bikerRegistrationRepository.save(bikerRegistrationDto);
    return {
      data: {
        registration: {
          uuid,
          ...bikerRegistrationDto,
        },
      },
    };
  }

  async search(
    query: SearchBikerRegistrationQueryDto
  ): Promise<PaginatedResponse<any>> {
    const [biker_registrations, total]: [Array<BikerRegistration>, number] = await this.bikerRegistrationRepository.findAndCount({
      where: {
        first_name: Like(`%${query.first_name ?? ''}%`),
        last_name: Like(`%${query.last_name ?? ''}%`),
        phone: Like(`%${query.phone ?? ''}%`),
        building_id: Like(`%${query.building_id ?? ''}%`),
      },
    });
    return {
      ...biker_registrations,
      count: biker_registrations?.length,
      offset: query?.offset,
      total,
    };
  }

  /**
   * Get Content by uuid
   */
  async getRegistrationByUuid(
    uuid: string,
  ): Promise<any> {
    const bikerRegistration = await this.bikerRegistrationRepository.find({ uuid });
    return {
      data: {
        bikerRegistration,
      },
    };
  }

  async update(
    uuid: string,
    bikerRegistrationDto: BikerRegistrationDto,
  ): Promise<any> {
    const bikerRegistration: BikerRegistration = await this.bikerRegistrationRepository.findOne({ uuid });
    await this.bikerRegistrationRepository.save({
      id: bikerRegistration.id,
      uuid: bikerRegistration.uuid,
      ...bikerRegistrationDto,
    });

    return {
      data: {
        registration: {
          uuid: bikerRegistration.uuid,
          ...bikerRegistrationDto,
        },
      },
    };
  }

  async deleteBikerByUuid(uuid: string): Promise<void> {
    await this.bikerRegistrationRepository.softDelete({ uuid });
  }


}
