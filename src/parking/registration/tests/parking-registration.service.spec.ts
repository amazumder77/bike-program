import { BadRequestException } from '@nestjs/common';
import * as uuid from 'uuid';
import { TranslatedContentData, TranslatedContentRO, ContentsRO } from '../interfaces/biker-registration.interface';
import { Test, TestingModule } from '@nestjs/testing';

import { BikerRegistration } from '../biker-registration.entity';
import { BikerRegistrationRepository } from '../biker-registration.repository';
import { BikerRegistrationService } from '../biker-registration.service';
import { CreateContentRequestDto } from '../dto/create-content-request.dto';
import { GetContentDto } from '../dto/get-content.dto';
import { PaginatedResponse } from '../../shared/pagination/paginated-response.interface';
import { PartialMock } from '../../@types/helpers.s';
import { Request } from 'express';
import { Response } from '../../shared/interfaces/standard-response.interface';
import { SearchContentDto } from '../dto/search-content.dto';
import { SearchBikerRegistrationQueryDto } from '../dto/search-biker-registration.dto';
import { TranslationService } from '../../translation-service/translation.service';
import { TypeEnum } from '../enums/type.enum';
import { createUniversalMock } from '@hqo/shared-modules/dist';
import getBaseRepositoryMock from '../../shared/entity/mocks/base.respostory.mock';
import { LocaleEnum } from '../../shared/enums/locales.enum';
import { TranslationSetRO } from '../../translation-service/interfaces/translation.interface';
import { TranslationLocaleEnum } from '../enums/translation_locales.enum';

function setContentDataEntity(): any {
  return {
    id: 1,
    uuid: 'uuid',
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
    directions_uuid: 'directions_uuid',
  };
}

function setTranslatedContentResponse(): TranslatedContentData {
  return {
    type: TypeEnum.POST,
    uuid: 'uuid',
    title: 'title',
    subtitle: 'subtitle',
    description_title: 'description_title',
    description: 'description',
    image_url: 'image_url',
    cta_url: 'cta_url',
    cta_label: 'cta_label',
    url: 'url',
    directions: 'directions',
  };
}

function setRequestDtoForCreateOrUpdate(): CreateContentRequestDto {
  return {
    type: TypeEnum.POST,
    translations: {
      [LocaleEnum.fr_FR]: {
        title: 'title French',
        subtitle: 'subtitle French',
        description_title: 'description_title French',
        description: 'description French',
        image_url: 'image_url French',
        cta_url: 'cta_url French',
        cta_label: 'cta_label French',
        url: 'url French',
        directions: 'directions French',
      },
    },
  };
}

describe('ContentService', () => {
  let contentService: BikerRegistrationService;
  let module: TestingModule;
  const contentRepositoryMock = getBaseRepositoryMock<BikerRegistration>();
  let translationServiceMock: PartialMock<TranslationService>;
  let createOrUpdateContentRequestDto: CreateContentRequestDto;
  let contentEntity: BikerRegistration;
  let translatedContentData: TranslatedContentData;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        BikerRegistrationService,
        {
          provide: BikerRegistrationRepository,
          useValue: contentRepositoryMock,
        },
        {
          provide: TranslationService,
          useValue: createUniversalMock(),
        },
      ],
    }).compile();

    translationServiceMock = module.get(TranslationService);
    contentService = module.get<BikerRegistrationService>('ContentService');
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async () => {
    jest.resetAllMocks();
    createOrUpdateContentRequestDto = setRequestDtoForCreateOrUpdate();
    contentEntity = setContentDataEntity();
    translatedContentData = setTranslatedContentResponse();
  });

  it('should be defined', async () => {
    expect(contentService).toBeDefined();
  });

  describe('get content(s)', () => {
    const someRequest = {} as unknown as Request;
    const someLocale = { lang: [LocaleEnum.en_GB.toLowerCase()] };
    const translationRO: TranslationSetRO = {
      translations: {
        title_uuid: {
          locale: TranslationLocaleEnum.en_GB,
          translated_string: 'title',
        },
        subtitle_uuid: {
          locale: TranslationLocaleEnum.en_GB,
          translated_string: 'subtitle',
        },
        description_title_uuid: {
          locale: TranslationLocaleEnum.en_GB,
          translated_string: 'description_title',
        },
        description_uuid: {
          locale: TranslationLocaleEnum.en_GB,
          translated_string: 'description',
        },
        image_url_uuid: {
          locale: TranslationLocaleEnum.en_GB,
          translated_string: 'image_url',
        },
        cta_url_uuid: {
          locale: TranslationLocaleEnum.en_GB,
          translated_string: 'cta_url',
        },
        cta_label_uuid: {
          locale: TranslationLocaleEnum.en_GB,
          translated_string: 'cta_label',
        },
        url_uuid: {
          locale: TranslationLocaleEnum.en_GB,
          translated_string: 'url',
        },
        directions_uuid: {
          locale: TranslationLocaleEnum.en_GB,
          translated_string: 'directions',
        },
      },
    };
    it('should get a Content by uuid', async () => {
      const result: Response<TranslatedContentRO> = {
        data: {
          content: translatedContentData,
        },
      };

      contentRepositoryMock.findOne.mockResolvedValueOnce(contentEntity);
      translationServiceMock.search.mockResolvedValueOnce(translationRO);

      expect(await contentService.getContentByUuid(someRequest, contentEntity.uuid, someLocale.lang)).toEqual(result);

      expect(contentRepositoryMock.findOne).toHaveBeenCalledTimes(1);
      expect(translationServiceMock.search).toHaveBeenCalledTimes(1);
    });

    it('should get Contents', async () => {
      const total = 1;
      const offset = 0;
      const limit = 10;
      const query: GetContentDto = {
        lang: ['en_GB'],
        sort: '-uuid',
        type: [TypeEnum.OFFER],
        offset,
        limit,
      } as GetContentDto;
      const result: PaginatedResponse<ContentsRO> = {
        data: {
          contents: [contentEntity],
        },
        count: total,
        total,
        offset,
      };

      contentRepositoryMock.findAndCount.mockResolvedValueOnce([[contentEntity], total]);

      expect(await contentService.getContent(query)).toEqual(result);

      expect(contentRepositoryMock.findAndCount).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    const contentUuid = uuid.v4();

    it('should create Content', async () => {
      contentRepositoryMock.save.mockReturnValueOnce({
        ...contentEntity,
        uuid: contentEntity.uuid,
      });

      expect(await contentService.registerBiker('testRequest' as unknown as Request, createOrUpdateContentRequestDto));

      expect(translationServiceMock.create).toHaveBeenCalledTimes(1);
      expect(contentRepositoryMock.save).toHaveBeenCalledTimes(1);
    });

    it('should create content when content uuid was passed', async () => {
      const contentDataWithUuid = {
        uuid: contentUuid,
        ...createOrUpdateContentRequestDto,
      };
      contentRepositoryMock.findOne.mockReturnValueOnce(null);
      contentRepositoryMock.save.mockReturnValueOnce(contentEntity);

      expect(await contentService.registerBiker('testRequest' as unknown as Request, contentDataWithUuid));

      expect(translationServiceMock.create).toHaveBeenCalledTimes(1);
      expect(contentRepositoryMock.save).toHaveBeenCalledTimes(1);
      expect(contentRepositoryMock.save).toHaveBeenCalledWith(
        expect.objectContaining({ uuid: contentUuid, type: contentDataWithUuid.type }),
      );
    });

    it('should throw exception when content with such uuid already exists', async () => {
      const contentDataWithUuid = {
        uuid: contentUuid,
        ...createOrUpdateContentRequestDto,
      };
      contentRepositoryMock.findOne.mockReturnValueOnce(contentEntity);

      await expect(
        contentService.registerBiker('testRequest' as unknown as Request, contentDataWithUuid),
      ).rejects.toThrow(BadRequestException);

      expect(contentRepositoryMock.findOne).toHaveBeenCalledTimes(1);
      expect(contentRepositoryMock.findOne).toHaveBeenCalledWith({ uuid: contentUuid });
    });

    it('should throw exception without translations', async () => {
      const createContentRequestDtoTemp = createOrUpdateContentRequestDto;
      createContentRequestDtoTemp.translations = {};
      await expect(
        contentService.registerBiker('testRequest' as unknown as Request, createContentRequestDtoTemp),
      ).rejects.toThrow(Error);
    });

    it('should throw exception when Translation service threw error', async () => {
      translationServiceMock.create.mockImplementationOnce(() => {
        throw Error();
      });
      await expect(
        contentService.registerBiker('testRequest' as unknown as Request, createOrUpdateContentRequestDto),
      ).rejects.toThrow(Error);
    });
  });

  describe('delete', () => {
    it('should delete Content', async () => {
      contentRepositoryMock.findOne.mockResolvedValueOnce(contentEntity);
      contentRepositoryMock.softDelete.mockResolvedValueOnce(contentEntity.uuid);
      await contentService.delete('testRequest' as unknown as Request, contentEntity.uuid);
      expect(translationServiceMock.delete).toHaveBeenCalledTimes(9); // Once for each uuid column stored in content table
      expect(contentRepositoryMock.softDelete).toHaveBeenCalledTimes(1);
    });

    it('should invoke delete endpoint only for not null uuids', async () => {
      const tmp_directions_uuid = contentEntity.directions_uuid;
      contentEntity.directions_uuid = null;
      contentRepositoryMock.findOne.mockReturnValueOnce(contentEntity);
      contentRepositoryMock.softDelete.mockResolvedValueOnce(contentEntity.uuid);
      await contentService.delete('testRequest' as unknown as Request, contentEntity.uuid);
      contentEntity.directions_uuid = tmp_directions_uuid;
      expect(translationServiceMock.delete).toHaveBeenCalledTimes(8); // Once for each uuid column stored in content table
      expect(contentRepositoryMock.softDelete).toHaveBeenCalledTimes(1);
    });

    it('should throw exception when content to DELETE is not found', async () => {
      contentRepositoryMock.findOne.mockResolvedValueOnce(null);
      await expect(contentService.delete('testRequest' as unknown as Request, contentEntity.uuid)).rejects.toThrow(
        Error,
      );
    });

    it('should throw exception when Translation service threw error', async () => {
      contentRepositoryMock.findOne.mockResolvedValue(contentEntity);
      translationServiceMock.delete.mockImplementationOnce(() => {
        throw Error();
      });
      await expect(contentService.delete('testRequest' as unknown as Request, contentEntity.uuid)).rejects.toThrow(
        Error,
      );
    });
  });

  describe('update', () => {
    it('should update successfully', async () => {
      contentRepositoryMock.findOne.mockResolvedValue(contentEntity);

      contentRepositoryMock.save.mockReturnValueOnce({
        ...contentEntity,
        uuid: contentEntity.uuid,
      });

      await contentService.update(
        'testRequest' as unknown as Request,
        contentEntity.uuid,
        createOrUpdateContentRequestDto,
      );
      expect(translationServiceMock.delete).toHaveBeenCalledTimes(9);
      expect(translationServiceMock.create).toHaveBeenCalledTimes(1);
      expect(contentRepositoryMock.save).toHaveBeenCalledTimes(1);
    });

    it('should throw exception when Content to UPDATE is not found', async () => {
      contentRepositoryMock.findOne.mockResolvedValueOnce(null);
      await expect(
        contentService.update('testRequest' as unknown as Request, contentEntity.uuid, createOrUpdateContentRequestDto),
      ).rejects.toThrow(Error);
    });

    it('should throw exception when Translation service threw error', async () => {
      contentRepositoryMock.findOne.mockResolvedValue(contentEntity);
      translationServiceMock.create.mockImplementationOnce(() => {
        throw Error();
      });
      await expect(
        contentService.update('testRequest' as unknown as Request, contentEntity.uuid, createOrUpdateContentRequestDto),
      ).rejects.toThrow(Error);
    });
  });

  describe('search', () => {
    const contentUuid = 'uuid1';
    const title_uuid = 'title_uuid1';
    const subtitle_uuid = 'subtitle_uuid1';
    const description_title_uuid = 'description_title_uuid1';
    const description_uuid = 'description_uuid1';
    const image_url_uuid = 'image_url_uuid1';
    const cta_url_uuid = 'cta_url_uuid1';
    const cta_label_uuid = 'cta_label_uuid1';
    const url_uuid = 'url_uuid1';
    const directions_uuid = 'directions_uuid1';
    const locale = 'en-us';
    const searchContentQueryDto: SearchBikerRegistrationQueryDto = {
      lang: ['en_US'],
    };
    const searchContentDto: SearchContentDto = {
      uuids: ['uuid1'],
    };
    const req = 'testRequest' as unknown as Request;

    it('should call Translation Service and add translations for the Content', async () => {
      contentRepositoryMock.findAndCount.mockReturnValueOnce([
        [
          {
            uuid: contentUuid,
            title_uuid,
            subtitle_uuid,
            description_title_uuid,
            description_uuid,
            image_url_uuid,
            cta_url_uuid,
            cta_label_uuid,
            url_uuid,
            directions_uuid,
          },
        ],
      ]);

      translationServiceMock.search.mockReturnValueOnce({
        translations: {
          [title_uuid]: { locale, translated_string: 'title' },
          [subtitle_uuid]: { locale, translated_string: 'subtitle' },
          [description_title_uuid]: { locale, translated_string: 'description_title' },
          [description_uuid]: { locale, translated_string: 'description' },
          [image_url_uuid]: { locale, translated_string: 'image_url' },
          [cta_url_uuid]: { locale, translated_string: 'cta_url' },
          [cta_label_uuid]: { locale, translated_string: 'cta_label' },
          [url_uuid]: { locale, translated_string: 'url' },
          [directions_uuid]: { locale, translated_string: 'directions' },
        },
      });

      expect(await contentService.search(req, searchContentQueryDto, searchContentDto));

      expect(translationServiceMock.search).toHaveBeenCalledWith(req, {
        uuids: [
          title_uuid,
          subtitle_uuid,
          description_title_uuid,
          description_uuid,
          image_url_uuid,
          cta_url_uuid,
          cta_label_uuid,
          url_uuid,
          directions_uuid,
        ],
        locale_preferences: [locale],
      });
    });

    it('should throw exception when Translation service threw error', async () => {
      translationServiceMock.search.mockImplementationOnce(() => {
        throw Error();
      });
      await expect(contentService.search(req, searchContentQueryDto, searchContentDto)).rejects.toThrow(Error);
    });
  });
});
