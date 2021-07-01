import { EntityRepository, Repository } from 'typeorm';

import { BikerRegistration } from './biker-registration.entity';

@EntityRepository(BikerRegistration)
export class BikerRegistrationRepository extends Repository<BikerRegistration> {}
