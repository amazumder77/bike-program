import { EntityRepository, Repository } from 'typeorm';

import { EventOrganizer } from './event-organizers.entity';

@EntityRepository(EventOrganizer)
export class EventOrganizerRepository extends Repository<EventOrganizer> { }
