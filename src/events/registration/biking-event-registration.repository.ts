import { EntityRepository, Repository } from 'typeorm';

import { BikingEventRegistration } from './biking-event-registration.entity';

@EntityRepository(BikingEventRegistration)
export class BikingEventRegistrationRepository extends Repository<BikingEventRegistration> {}
