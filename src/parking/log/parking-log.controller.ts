import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Query, Put, Post, Param } from '@nestjs/common';
import { ParkingLogService } from './parking-log.service';
import { ParkingLogDto } from './dto/parking-log.dto';
import { SearchParkingLogQueryDto } from './dto/search-parking-log.dto';
import { PaginatedResponse } from '../../shared/pagination/paginated-response.interface';
import { SearchParkingLogRO, ParkingLogRO } from './interfaces/parking-log.interface';

@Controller('v1/parking-log')
export class ParkingLogController {
  constructor(private readonly bikerRegistrationService: ParkingLogService) { }

  @Post()
  async registerBiker(@Body() parkingLogDto: ParkingLogDto): Promise<ParkingLogRO> {
    return await this.bikerRegistrationService.createParkingLog(parkingLogDto);
  }

  @Get('/find/:uuid')
  async getBikerByUuid(@Param('uuid') uuid: string): Promise<ParkingLogRO> {
    return await this.bikerRegistrationService.getParkingLogByUuid(uuid);
  }

  @Put('/:uuid')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('uuid') uuid: string,
    @Body() parkingLogDto: ParkingLogDto,
  ): Promise<ParkingLogRO> {
    return await this.bikerRegistrationService.update(uuid, parkingLogDto);
  }

  @Delete('/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('uuid') uuid: string): Promise<void> {
    await this.bikerRegistrationService.deleteParkingLogByUuid(uuid);
  }

  @Get('/search')
  @HttpCode(HttpStatus.OK)
  async search(@Query() query: SearchParkingLogQueryDto): Promise<PaginatedResponse<SearchParkingLogRO>> {
    return await this.bikerRegistrationService.search(query);
  }
}
