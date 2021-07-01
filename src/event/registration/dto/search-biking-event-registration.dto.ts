import { IsOptional } from 'class-validator';
import PaginatedParamsDto from '../../../shared/pagination/paginated-params.dto';
import { TransformStringToArray } from '../../../../../../projects/helix/src/shared/decorators/transform-string-to-array';

export class SearchBikingEventRegistrationQueryDto extends PaginatedParamsDto {
  @TransformStringToArray()
  @IsOptional()
  event_ids?: Array<string>;

  @TransformStringToArray()
  @IsOptional()
  biker_registration_ids?: Array<string>;
}
