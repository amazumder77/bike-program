import { EventOrganizersDto } from '../dto/event-organizers.dto';
import { PaginatedResponse } from '../../../shared/pagination/paginated-response.interface';

export interface EventOrganizersRO {
  organizer: EventOrganizersDto;
}

export interface SearchEventOrganizersRO extends PaginatedResponse<EventOrganizersDto> {
  organizers: Array<EventOrganizersDto>;
}
