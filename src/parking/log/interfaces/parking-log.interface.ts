import { ParkingLogDto } from '../dto/parking-log.dto';
import { PaginatedResponse } from '../../../shared/pagination/paginated-response.interface';

export interface ParkingLogRO {
  parking: ParkingLogDto;
}

export interface SearchParkingLogRO extends PaginatedResponse<ParkingLogDto> {
  parkings: Array<ParkingLogDto>;
}
