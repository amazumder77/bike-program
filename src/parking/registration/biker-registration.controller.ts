import { HttpCode, HttpStatus, Query, Put } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
} from '@nestjs/common';
import { BikerRegistrationService } from './biker-registration.service';
import { BikerRegistrationDto } from './dto/biker-registration.dto';
import { SearchBikerRegistrationQueryDto } from './dto/search-biker-registration.dto';
import { PaginatedResponse } from '../../shared/pagination/paginated-response.interface';

@Controller('v1/biker-registration')
export class BikerRegistrationController {
  constructor(private readonly bikerRegistrationService: BikerRegistrationService) { }

  @Post()
  async registerBiker(@Body() bikerRegistrationDto: BikerRegistrationDto): Promise<any> {
    return await this.bikerRegistrationService.registerBiker(bikerRegistrationDto);
  }

  @Get('/find/:uuid')
  async getBikerByUuid(
    @Param('uuid') uuid: string,
  ): Promise<any> {
    return await this.bikerRegistrationService.getRegistrationByUuid(uuid);
  }


  @Put('/:uuid')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('uuid') uuid: string,
    @Body() bikerRegistrationDto: BikerRegistrationDto,
  ): Promise<any> {
    return await this.bikerRegistrationService.update(uuid, bikerRegistrationDto);
  }

  @Delete('/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('uuid') uuid: string): Promise<void> {
    await this.bikerRegistrationService.deleteBikerByUuid(uuid);
  }

  @Get('/search')
  @HttpCode(HttpStatus.OK)
  async search(
    @Query() query: SearchBikerRegistrationQueryDto,
  ): Promise<PaginatedResponse<any>> {
    return await this.bikerRegistrationService.search(query);
  }

}
