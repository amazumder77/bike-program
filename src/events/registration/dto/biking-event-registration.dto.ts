import { TransformDate } from '@hqo/shared-modules/dist';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsNumber, IsBoolean, IsDate } from 'class-validator';

export class BikingEventRegistrationDto {
  uuid: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  biker_registration_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  event_id: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_waiver_signed?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  has_biker_reported?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  has_biker_completed?: boolean;

  @ApiProperty()
  @TransformDate()
  @IsDate()
  @IsOptional()
  start_time?: Date;

  @ApiProperty()
  @TransformDate()
  @IsDate()
  @IsOptional()
  end_time?: Date;
}
