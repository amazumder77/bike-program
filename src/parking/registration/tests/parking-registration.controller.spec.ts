import { BikerRegistrationController } from '../biker-registration.controller';
import { BikerRegistrationService } from '../biker-registration.service';
import { GetContentDto } from '../dto/get-content.dto';
import { PartialMock } from '../../@types/helpers.s';
import { Request } from 'express';
import { SearchContentDto } from '../dto/search-content.dto';
import { SearchContentQueryDto } from '../dto/search-content-query.dto';
import { Test } from '@nestjs/testing';
import { TypeEnum } from '../enums/type.enum';
import { createUniversalMock } from '@hqo/shared-modules/dist';
import { LocaleEnum } from '../../shared/enums/locales.enum';
import { CreateContentRequestDto } from '../dto/create-content-request.dto';

describe('Content Controller', () => {
  let contentController: BikerRegistrationController;
  let contentServiceMock: PartialMock<BikerRegistrationService>;

  const createContentRequestDto: CreateContentRequestDto = {
    type: TypeEnum.POST,
    translations: {
      [LocaleEnum.en_GB]: {
        title: 'title French',
        subtitle: 'subtitle French',
        description_title: 'description_title French',
        description: 'description French',
        image_url: 'image_url French',
        cta_url: 'cta_url French',
        cta_label: 'cta_label French',
        url: 'url French',
        directions: 'directions',
      },
    },
  };

  const contentCreateDto = {
    type: TypeEnum.POST,
    date: new Date(),
    title_uuid: 'title_uuid',
    subtitle_uuid: 'subtitle_uuid',
    description_title_uuid: 'description_title_uuid',
    description_uuid: 'description_uuid',
    image_url_uuid: 'image_url_uuid',
    cta_url_uuid: 'cta_url_uuid',
    cta_label_uuid: 'cta_label_uuid',
    url_uuid: 'url_uuid',
  };

  const contentDto = {
    id: 1,
    uuid: 'uuid',
    ...contentCreateDto,
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [BikerRegistrationController],
      providers: [
        BikerRegistrationController,
        {
          provide: BikerRegistrationService,
          useValue: createUniversalMock(),
        },
      ],
    }).compile();

    contentController = module.get<BikerRegistrationController>(BikerRegistrationController);
    contentServiceMock = module.get(BikerRegistrationService);
  });

  describe('create', () => {
    it('should call contentService create function', async () => {
      await contentController.create('testRequest' as unknown as Request, createContentRequestDto);
      expect(contentServiceMock.create).toHaveBeenCalledWith('testRequest', createContentRequestDto);
    });
  });

  describe('getContent', () => {
    it('should call notificationService to get a notification', async (): Promise<void> => {
      const someRequest = {} as unknown as Request;
      const someLocale = { lang: [LocaleEnum.en_GB] };
      await contentController.getContentByUuid(someRequest, contentDto.uuid, someLocale);
      expect(contentServiceMock.getContentByUuid).toHaveBeenCalledWith(someRequest, contentDto.uuid, someLocale.lang);
    });
  });

  describe('getContents', () => {
    it('should call notificationService to get a notification', async (): Promise<void> => {
      const getContentsDto = {
        type: [TypeEnum.POST],
        sort: 'name',
        offset: 0,
        limit: 10,
      } as GetContentDto;
      await contentController.getContent(getContentsDto);
      expect(contentServiceMock.getContent).toHaveBeenCalled();
    });
  });

  describe('searchContents', () => {
    it('should get searched contents', async (): Promise<void> => {
      const searchContentQueryDto = {} as SearchContentQueryDto;
      const searchContentDto = {} as SearchContentDto;
      await contentController.search('testRequest' as unknown as Request, searchContentQueryDto, searchContentDto);
      expect(contentServiceMock.search).toHaveBeenCalledWith('testRequest', searchContentQueryDto, searchContentDto);
    });
  });

  describe('delete', () => {
    it('should call notificationService delete function', async () => {
      await contentController.delete('testRequest' as unknown as Request, contentDto.uuid);
      expect(contentServiceMock.delete).toHaveBeenCalledWith('testRequest', contentDto.uuid);
    });
  });

  describe('update', () => {
    it('should call notificationService update function', async () => {
      await contentController.update('testRequest' as unknown as Request, 'contentUuid', createContentRequestDto);
      expect(contentServiceMock.update).toHaveBeenCalledWith('testRequest', 'contentUuid', createContentRequestDto);
    });
  });
});
