import { IsString, IsOptional, IsUUID, IsNotEmpty, IsNumber, IsEmail, IsMobilePhone, IsBoolean } from 'class-validator';

export class BikerRegistrationDto {

  @IsString()
  @IsNotEmpty()
  first_name: string;

  // @IsString()
  // @IsNotEmpty()
  // last_name: string;

  // @IsMobilePhone()
  // @IsNotEmpty()
  // phone: string;

  // @IsEmail()
  // @IsNotEmpty()
  // email: string;

  // @IsNumber()
  // @IsNotEmpty()
  // building_id: number;

  // @IsString()
  // @IsOptional()
  // company?: string;

  // @IsBoolean()
  // @IsOptional()
  // is_tenant?: boolean;

  // @IsBoolean()
  // @IsOptional()
  // is_admin?: boolean;

  // @IsBoolean()
  // @IsOptional()
  // is_visitor?: boolean;

  // @IsBoolean()
  // @IsOptional()
  // is_verified?: boolean;

  // @IsBoolean()
  // @IsOptional()
  // has_building_access?: boolean;

}
