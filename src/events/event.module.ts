import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { BikingEventRegistration } from './registration/biking-event-registration.entity';
import { BikingEventRegistrationController } from './registration/biking-event-registration.controller';
import { BikingEventRegistrationService } from './registration/biking-event-registration.service';

@Module({
  imports: [TypeOrmModule.forFeature([BikingEventRegistration])],
  controllers: [BikingEventRegistrationController],
  providers: [BikingEventRegistrationService],
})
export class EventModule {}
