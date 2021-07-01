import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsNumber, IsEmail, IsMobilePhone, IsBoolean } from 'class-validator';

export class BikerRegistrationDto {
  uuid: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @IsMobilePhone()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  building_id: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  company?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_tenant?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_admin?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_visitor?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_verified?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  has_building_access?: boolean;
}
