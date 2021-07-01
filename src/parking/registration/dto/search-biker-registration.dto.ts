import { IsOptional, IsString, IsNumber } from 'class-validator';
import PaginatedParamsDto from '../../../shared/pagination/paginated-params.dto';


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

  @IsString()
  @IsOptional()
  building_id?: string;
}
