import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsNumber, IsBoolean, IsString, IsPhoneNumber, IsEmail } from 'class-validator';

export class EventOrganizersDto {
  uuid: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  event_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_primary_contact?: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  company: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsOptional()
  company_phone: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_tenant?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  has_building_access?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_verified?: boolean;
}
