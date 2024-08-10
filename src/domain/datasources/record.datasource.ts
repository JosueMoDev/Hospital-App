import {
  PaginationDto,
  CreateRecordDto,
  UpdateRecordDto,
  UploadDto,
} from '@domain/dtos';
import { RecordEntity, PaginationEntity } from '@domain/entities';
import { UploadedFile } from 'express-fileupload';

export abstract class RecordDataSource {
  abstract findOneById(id: string): Promise<RecordEntity>;

  abstract findMany(
    dto: PaginationDto,
  ): Promise<{ pagination: PaginationEntity; records: RecordEntity[] }>;

  abstract create(dto: CreateRecordDto): Promise<RecordEntity>;

  abstract uptate(dto: UpdateRecordDto): Promise<RecordEntity>;

  abstract changeRecordStatus(dto: UpdateRecordDto): Promise<boolean>;

  abstract uploadPDF(dto: UploadDto, file: UploadedFile): Promise<boolean>;

  abstract deletePDF(dto: UploadDto): Promise<boolean>;
}
