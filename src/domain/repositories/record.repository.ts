import { CreateRecordDto, PaginationDto, UpdateRecordDto } from "../dtos";
import { PaginationEntity, RecordEntity } from "../entities";

export abstract class RecordRepository {

  abstract findOneById(id: string): Promise<RecordEntity>;

  abstract findMany(dto: PaginationDto): Promise<{ pagination: PaginationEntity, records: RecordEntity[] }>;

  abstract create(dto: CreateRecordDto): Promise<RecordEntity>;

  abstract uptate(dto: UpdateRecordDto): Promise<RecordEntity>;

  abstract changeRecordStatus(dto: UpdateRecordDto): Promise<RecordEntity>;
}