import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingLog } from './parking-log.entity';
import { ParkingLogRepository } from './parking-log.repository';

import { SearchParkingLogQueryDto } from './dto/search-parking-log.dto';
import { PaginatedResponse } from '../../shared/pagination/paginated-response.interface';
import { In, Between } from 'typeorm';
import { ParkingLogDto } from './dto/parking-log.dto';
import { SearchParkingLogRO, ParkingLogRO } from './interfaces/parking-log.interface';
import * as moment from 'moment';

@Injectable()
export class ParkingLogService {
  constructor(
    @InjectRepository(ParkingLog)
    private readonly parkingLogRepository: ParkingLogRepository,
  ) {}

  async createParkingLog(parkingLogDto: ParkingLogDto): Promise<ParkingLogRO> {
    const { uuid } = await this.parkingLogRepository.save(parkingLogDto);
    return {
      parking: {
        uuid,
        ...parkingLogDto,
      },
    };
  }

  async search(query: SearchParkingLogQueryDto): Promise<PaginatedResponse<SearchParkingLogRO>> {
    const [parkings, total]: [Array<ParkingLog>, number] = await this.parkingLogRepository.findAndCount({
      where: {
        ...(query?.building_ids && { building_id: In([...query.building_ids]) }),
        ...(query?.biker_registration_ids && { biker_registration_id: In([...query.biker_registration_ids]) }),
        ...(query?.entry_start_date &&
          query.entry_end_date && {
            entry_time: Between(
              moment.utc(query.entry_start_date).startOf('day').toDate(),
              moment.utc(query.entry_end_date).endOf('day').toDate(),
            ),
          }),
        ...(query?.exit_start_date &&
          query.exit_end_date && {
            exit_time: Between(
              moment.utc(query.exit_start_date).startOf('day').toDate(),
              moment.utc(query.exit_end_date).endOf('day').toDate(),
            ),
          }),
      },
    });
    return {
      parkings: parkings,
      count: parkings?.length,
      offset: query?.offset,
      total,
    } as PaginatedResponse<SearchParkingLogRO>;
  }

  async getParkingLogByUuid(uuid: string): Promise<ParkingLogRO> {
    const { building_id, biker_registration_id, entry_time, exit_time } = await this.parkingLogRepository.findOne({
      uuid,
    });
    return {
      parking: {
        building_id,
        biker_registration_id,
        entry_time,
        exit_time,
      },
    };
  }

  async update(uuid: string, parkingLogDto: ParkingLogDto): Promise<ParkingLogRO> {
    const parkingLog: ParkingLog = await this.parkingLogRepository.findOne({ uuid });
    await this.parkingLogRepository.save({
      id: parkingLog.id,
      uuid: parkingLog.uuid,
      ...parkingLogDto,
    });
    return {
      parking: {
        uuid: parkingLog.uuid,
        ...parkingLogDto,
      },
    };
  }

  async deleteParkingLogByUuid(uuid: string): Promise<void> {
    await this.parkingLogRepository.softDelete({ uuid });
  }
}
