import { TransformDate } from '@hqo/shared-modules/dist';
import { IsOptional, IsString, IsDate } from 'class-validator';
import PaginatedParamsDto from '../../../shared/pagination/paginated-params.dto';

export class SearchParkingLogQueryDto extends PaginatedParamsDto {
  @IsString()
  @IsOptional()
  building_id?: number;

  @IsString()
  @IsOptional()
  biker_registration_id?: number;

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
