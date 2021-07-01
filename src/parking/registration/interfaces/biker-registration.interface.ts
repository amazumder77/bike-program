import { BikerRegistrationDto } from '../dto/biker-registration.dto';
import { PaginatedResponse } from '../../../shared/pagination/paginated-response.interface';

export interface BikerRegistrationRO {
  registration: BikerRegistrationDto;
}

export interface SearchBikerRegistrationRO extends PaginatedResponse<BikerRegistrationDto> {
  registrations: Array<BikerRegistrationDto>;
}
