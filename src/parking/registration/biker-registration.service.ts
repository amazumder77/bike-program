import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BikerRegistration } from './biker-registration.entity';
import { BikerRegistrationRepository } from './biker-registration.repository';

import { SearchBikerRegistrationQueryDto } from './dto/search-biker-registration.dto';
import { PaginatedResponse } from '../../shared/pagination/paginated-response.interface';
import { Like, In } from 'typeorm';
import { BikerRegistrationDto } from './dto/biker-registration.dto';
import { BikerRegistrationRO, SearchBikerRegistrationRO } from './interfaces/biker-registration.interface';

@Injectable()
export class BikerRegistrationService {
  constructor(
    @InjectRepository(BikerRegistration)
    private readonly bikerRegistrationRepository: BikerRegistrationRepository,
  ) {}

  async registerBiker(bikerRegistrationDto: BikerRegistrationDto): Promise<BikerRegistrationRO> {
    const { uuid } = await this.bikerRegistrationRepository.save(bikerRegistrationDto);
    return {
      registration: {
        uuid,
        ...bikerRegistrationDto,
      },
    };
  }

  async search(query: SearchBikerRegistrationQueryDto): Promise<PaginatedResponse<SearchBikerRegistrationRO>> {
    const [biker_registrations, total]: [Array<BikerRegistration>, number] =
      await this.bikerRegistrationRepository.findAndCount({
        where: {
          ...(query?.first_name && { first_name: Like(`%${query.first_name}%`) }),
          ...(query?.last_name && { last_name: Like(`%${query.last_name}%`) }),
          ...(query?.phone && { phone: Like(`%${query.phone}%`) }),
          ...(query?.building_ids && { building_id: In([...query.building_ids]) }),
        },
      });
    return {
      registrations: biker_registrations,
      count: biker_registrations?.length,
      offset: query?.offset,
      total,
    } as PaginatedResponse<SearchBikerRegistrationRO>;
  }

  async getRegistrationByUuid(uuid: string): Promise<BikerRegistrationRO> {
    const { first_name, last_name, email, phone, building_id, is_verified } =
      await this.bikerRegistrationRepository.findOne({ uuid });
    return {
      registration: {
        first_name,
        last_name,
        email,
        phone,
        is_verified,
        building_id,
      },
    } as BikerRegistrationRO;
  }

  async update(uuid: string, bikerRegistrationDto: BikerRegistrationDto): Promise<BikerRegistrationRO> {
    const bikerRegistration: BikerRegistration = await this.bikerRegistrationRepository.findOne({ uuid });
    await this.bikerRegistrationRepository.save({
      id: bikerRegistration.id,
      uuid: bikerRegistration.uuid,
      ...bikerRegistrationDto,
    });
    return {
      registration: {
        uuid: bikerRegistration.uuid,
        ...bikerRegistrationDto,
      },
    };
  }

  async deleteBikerByUuid(uuid: string): Promise<void> {
    await this.bikerRegistrationRepository.softDelete({ uuid });
  }
}
