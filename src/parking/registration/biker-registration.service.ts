import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BikerRegistration } from './biker-registration.entity';
import { BikerRegistrationRepository } from './biker-registration.repository';
import { BikerRegistrationDto } from './dto/biker-registration.dto';

@Injectable()
export class BikerRegistrationService {
  constructor(
    @InjectRepository(BikerRegistration)
    private readonly bikerRegistrationRepository: BikerRegistrationRepository,
  ) { }

  async create(bikerRegistrtionRequest: BikerRegistrationDto): Promise<any> {

    const { uuid } = await this.bikerRegistrationRepository.save(bikerRegistrtionRequest);
    return {
      data: {
        registration: {
          uuid,
          ...bikerRegistrtionRequest,
        },
      },
    };
  }

  // /**
  //  * Search Content
  //  */
  // async search(
  //   request: Request,
  //   query: SearchContentQueryDto,
  //   body: SearchContentDto,
  // ): Promise<PaginatedResponse<TranslatedContentsRO>> {
  //   const [contents, total]: [Array<BikerRegistration>, number] = await this.bikerRegistrationRepository.findAndCount({
  //     where: {
  //       uuid: In(body.uuids),
  //     },
  //     take: query?.limit,
  //     skip: query?.offset,
  //   });
  //   return {};
  // }

  /**
   * Get Content by uuid
   */
  async getRegistrationByUuid(
    uuid: string,
  ): Promise<any> {
    const bikerRegistration = await this.bikerRegistrationRepository.find({ uuid });
    return {
      data: {
        bikerRegistration,
      },
    };
  }

  // /**
  //  * Update a specific Content for all the languages. Since there is only one uuid per field (title, description etc) across all languages,
  //  * current flow is to delete all existing records in translations service followed by creating new records with the latest
  //  * translation scripts.
  //  */
  // async update(
  //   request: Request,
  //   contentUuid: string,
  //   contentRequestData: CreateContentRequestDto,
  // ): Promise<Response<ContentRO>> {
  //   const promises = [];
  //   const contentEntity: BikerRegistration = await this.findContentByUuid(contentUuid);
  //   const allContentUuids = await this.getTranslationUuidsFromContent(contentEntity);
  //   allContentUuids.forEach((translation_uuid) => {
  //     // Avoid invoking translation service when uuid is null - there will be cases where all fields
  //     // in content table won't need translation.
  //     if (translation_uuid) {
  //       promises.push(this.translationService.delete(request, translation_uuid));
  //     }
  //   });
  //   await Promise.all(promises);

  //   const contentData = await this.createTranslations(contentRequestData, request);
  //   const { type } = contentRequestData;

  //   await this.bikerRegistrationRepository.save({
  //     id: contentEntity.id,
  //     uuid: contentUuid,
  //     type,
  //     ...contentData,
  //   });

  //   return {
  //     data: {
  //       content: {
  //         uuid: contentUuid,
  //         type,
  //         ...contentData,
  //       } as BikerRegistrationDto,
  //     },
  //   };
  // }

  // /**
  //  * Delete Content. Currently delete endpoint in translation service is invoked per uuid.
  //  * Let suppose there are 8 translations (title, subtitle etc) created for a specific content, delete endpoint
  //  * is invoked eight times.
  //  */
  // async delete(request: Request, contentUuid: string): Promise<void> {
  //   const promises = [];
  //   const contentEntity: BikerRegistration = await this.findContentByUuid(contentUuid);
  //   const allContentUuids = await this.getTranslationUuidsFromContent(contentEntity);
  //   allContentUuids.forEach((translation_uuid) => {
  //     // Avoid invoking translation service when uuid is null - there will be cases where all fields
  //     // in content table won't need translation.
  //     if (translation_uuid) {
  //       promises.push(this.translationService.delete(request, translation_uuid));
  //     }
  //   });
  //   promises.push(this.bikerRegistrationRepository.softDelete({ uuid: contentEntity.uuid }));
  //   await Promise.all(promises);
  // }


}
