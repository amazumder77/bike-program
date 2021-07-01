import { IsOptional, IsString } from 'class-validator';
import PaginatedParamsDto from '../../../shared/pagination/paginated-params.dto';
import { TransformStringToArray } from '../../../../../../projects/helix/src/shared/decorators/transform-string-to-array';

export class SearchBikerRegistrationQueryDto extends PaginatedParamsDto {
  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @TransformStringToArray()
  @IsOptional()
  building_ids?: Array<string>;
}
