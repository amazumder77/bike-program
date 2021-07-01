import { EntityRepository, Repository } from 'typeorm';

import { ParkingLog } from './parking-log.entity';

@EntityRepository(ParkingLog)
export class ParkingLogRepository extends Repository<ParkingLog> { }
