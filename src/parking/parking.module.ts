import { BikerRegistration } from './registration/biker-registration.entity';
import { BikerRegistrationService } from './registration/biker-registration.service';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { BikerRegistrationController } from './registration/biker-registration.controller';
import { ParkingLog } from './log/parking-log.entity';
import { ParkingLogController } from './log/parking-log.controller';
import { ParkingLogService } from './log/parking-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([BikerRegistration, ParkingLog])],
  controllers: [BikerRegistrationController, ParkingLogController],
  providers: [BikerRegistrationService, ParkingLogService],
})
export class ParkingModule { }
