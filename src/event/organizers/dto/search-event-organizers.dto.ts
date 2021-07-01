import { IsOptional, IsString } from 'class-validator';
import PaginatedParamsDto from '../../../shared/pagination/paginated-params.dto';
import { TransformStringToArray } from '../../../../../../projects/helix/src/shared/decorators/transform-string-to-array';

export class SearchEventOrganizersQueryDto extends PaginatedParamsDto {
  @TransformStringToArray()
  @IsOptional()
  event_ids?: Array<string>;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  company_phone?: string;
}
