import { BikingEventRegistrationDto } from '../dto/biking-event-registration.dto';
import { PaginatedResponse } from '../../../shared/pagination/paginated-response.interface';

export interface BikingEventRegistrationRO {
  registration: BikingEventRegistrationDto;
}

export interface SearchBikingEventRegistrationRO extends PaginatedResponse<BikingEventRegistrationDto> {
  registrations: Array<BikingEventRegistrationDto>;
}
