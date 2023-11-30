import { UploadedFile } from "express-fileupload";
import { CreateRecordDto, PaginationDto, UpdateRecordDto, UploadDto } from "../dtos";
import { PaginationEntity, RecordEntity } from "../entities";

export abstract class RecordDataSource {

  abstract findOneById(id: string): Promise<RecordEntity>

  abstract findMany(dto: PaginationDto): Promise<{ pagination: PaginationEntity, records: RecordEntity[] }>;

  abstract create(dto: CreateRecordDto): Promise<RecordEntity>;

  abstract uptate(dto: UpdateRecordDto): Promise<RecordEntity>;

  abstract changeRecordStatus(dto: UpdateRecordDto): Promise<RecordEntity>;

  abstract uploadPDF(dto: UploadDto, file: UploadedFile): Promise<boolean>;

  abstract deletePDF(dto: UploadDto): Promise<boolean>;
}