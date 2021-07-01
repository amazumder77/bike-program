import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { BikingEventRegistration } from './registration/biking-event-registration.entity';
import { BikingEventRegistrationController } from './registration/biking-event-registration.controller';
import { BikingEventRegistrationService } from './registration/biking-event-registration.service';
import { EventOrganizer } from './organizers/event-organizers.entity';
import { EventOrganizersService } from './organizers/event-organizers.service';
import { EventOrganizersController } from './organizers/event-organizers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BikingEventRegistration, EventOrganizer])],
  controllers: [BikingEventRegistrationController, EventOrganizersController],
  providers: [BikingEventRegistrationService, EventOrganizersService],
})
export class EventModule { }
