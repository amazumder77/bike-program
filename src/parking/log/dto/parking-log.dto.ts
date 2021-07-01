import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDate, IsOptional } from 'class-validator';
import { TransformDate } from '../../../../../../projects/helix/src/shared/decorators/transform-date';

export class ParkingLogDto {
  uuid?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  building_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  biker_registration_id: number;

  @ApiProperty()
  @TransformDate()
  @IsDate()
  @IsOptional()
  entry_time?: Date;

  @ApiProperty()
  @TransformDate()
  @IsDate()
  @IsOptional()
  exit_time?: Date;
}
