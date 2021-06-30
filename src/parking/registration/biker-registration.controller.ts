import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { BikerRegistrationService } from './biker-registration.service';
import { BikerRegistrationDto } from './dto/biker-registration.dto';

@Controller('v1/biker/registration')
// @UseGuards(JwtAuthGuard)
export class BikerRegistrationController {
  constructor(private readonly bikerRegistrationService: BikerRegistrationService) { }

  /**
   * Create new content
   */
  @Post()
  async create(@Req() request: Request, @Body() bikerRegistrationDto: BikerRegistrationDto): Promise<any> {
    return await this.bikerRegistrationService.create(bikerRegistrationDto);
  }

  // /**
  //  * Get content
  //  */
  @Get('/:uuid')
  async getRegistrationByUuid(
    @Param('uuid') uuid: string,
  ): Promise<any> {
    return await this.bikerRegistrationService.getRegistrationByUuid(uuid);
  }

  // /**
  //  * Get contents
  //  */
  // @Get()
  // async getContent(@Query() query: GetContentDto): Promise<PaginatedResponse<ContentsRO>> {
  //   return await this.contentService.getContent(query);
  // }

  // /**
  //  * Update an existing content
  //  */
  // @Put('/:uuid')
  // @HttpCode(HttpStatus.OK)
  // async update(
  //   @Req() request: Request,
  //   @Param('uuid') uuid: string,
  //   @Body() content: CreateContentRequestDto,
  // ): Promise<Response<ContentRO>> {
  //   return await this.contentService.update(request, uuid, content);
  // }

  // /**
  //  * Delete content
  //  */
  // @Delete('/:uuid')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async delete(@Req() request: Request, @Param('uuid') uuid: string): Promise<void> {
  //   await this.contentService.delete(request, uuid);
  // }

  // /**
  //  * Search contents
  //  */
  // @Post('/search')
  // @HttpCode(HttpStatus.OK)
  // async search(
  //   @Req() request: Request,
  //   @Query() query: SearchContentQueryDto,
  //   @Body() body: SearchContentDto,
  // ): Promise<PaginatedResponse<TranslatedContentsRO>> {
  //   return await this.contentService.search(request, query, body);
  // }
}
