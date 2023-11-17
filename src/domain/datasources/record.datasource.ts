import { CreateRecordDto, PaginationDto } from "../dtos";
import { RecordEntity } from "../entities";

export abstract class RecordDataSource {

  abstract findOneById(id: string): Promise<RecordEntity>

  abstract findMany(dto: PaginationDto): Promise<RecordEntity[]>;

  abstract create(dto: CreateRecordDto): Promise<RecordEntity>;

  abstract uptate(dto: any): Promise<RecordEntity>;

  abstract hiddeRecords(id: string): Promise<Boolean>;
}