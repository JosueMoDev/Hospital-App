import { RecordEntity } from "../entities/record.entity";

export abstract class RecordDataSource {

  abstract findMany(): Promise<RecordEntity[]>;

  abstract create(dto: any): Promise<RecordEntity>;

  abstract uptate(dto: any): Promise<RecordEntity>;

  abstract hiddeRecords(id: string): Promise<Boolean>;
}