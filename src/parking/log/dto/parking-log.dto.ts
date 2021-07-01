import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsString()
  @IsOptional()
  entry_time?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  exit_time?: string;
}
