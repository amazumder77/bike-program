import { TransformDate } from '@hqo/shared-modules/dist';
import { IsOptional, IsDate } from 'class-validator';
import { TransformStringToArray } from '../../../shared/decorators/transform-string-to-array';
import PaginatedParamsDto from '../../../shared/pagination/paginated-params.dto';

export class SearchParkingLogQueryDto extends PaginatedParamsDto {
  @TransformStringToArray()
  @IsOptional()
  building_ids?: Array<string>;

  @TransformStringToArray()
  @IsOptional()
  biker_registration_ids?: Array<string>;

  @IsDate()
  @TransformDate()
  @IsOptional()
  entry_start_date?: Date;

  @IsDate()
  @TransformDate()
  @IsOptional()
  entry_end_date?: Date;

  @IsDate()
  @TransformDate()
  @IsOptional()
  exit_start_date?: Date;

  @IsDate()
  @TransformDate()
  @IsOptional()
  exit_end_date?: Date;
}
