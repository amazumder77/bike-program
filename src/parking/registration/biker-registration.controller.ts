import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Query, Put, Post, Param } from '@nestjs/common';
import { BikerRegistrationService } from './biker-registration.service';
import { BikerRegistrationDto } from './dto/biker-registration.dto';
import { SearchBikerRegistrationQueryDto } from './dto/search-biker-registration.dto';
import { PaginatedResponse } from '../../shared/pagination/paginated-response.interface';
import { BikerRegistrationRO, SearchBikerRegistrationRO } from './interfaces/biker-registration.interface';

@Controller('v1/biker-registration')
export class BikerRegistrationController {
  constructor(private readonly bikerRegistrationService: BikerRegistrationService) {}

  @Post()
  async registerBiker(@Body() bikerRegistrationDto: BikerRegistrationDto): Promise<BikerRegistrationRO> {
    return await this.bikerRegistrationService.registerBiker(bikerRegistrationDto);
  }

  @Get('/find/:uuid')
  async getBikerByUuid(@Param('uuid') uuid: string): Promise<BikerRegistrationRO> {
    return await this.bikerRegistrationService.getRegistrationByUuid(uuid);
  }

  @Put('/:uuid')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('uuid') uuid: string,
    @Body() bikerRegistrationDto: BikerRegistrationDto,
  ): Promise<BikerRegistrationRO> {
    return await this.bikerRegistrationService.update(uuid, bikerRegistrationDto);
  }

  @Delete('/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('uuid') uuid: string): Promise<void> {
    await this.bikerRegistrationService.deleteBikerByUuid(uuid);
  }

  @Get('/search')
  @HttpCode(HttpStatus.OK)
  async search(@Query() query: SearchBikerRegistrationQueryDto): Promise<PaginatedResponse<SearchBikerRegistrationRO>> {
    return await this.bikerRegistrationService.search(query);
  }
}
