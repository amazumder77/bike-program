import { IsNumber, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { TransformNumberString } from '../decorators/transform-number-string';

export default class PaginatedParamsDto {
  @ApiProperty()
  @TransformNumberString()
  @IsOptional()
  @IsNumber()
  offset? = 0;

  @ApiProperty()
  @TransformNumberString()
  @IsOptional()
  @IsNumber()
  limit? = 10;
}
