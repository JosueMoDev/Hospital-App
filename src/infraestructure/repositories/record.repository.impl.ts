import { RecordDataSource, RecordEntity, RecordRepository } from "../../domain";

export class RecordRepositoryImpl implements RecordRepository {

    constructor(private readonly datasource: RecordDataSource){}

    findMany(): Promise<RecordEntity[]> {
        return this.datasource.findMany();
    }
    create(dto: any): Promise<RecordEntity> {
        return this.datasource.create(dto);
    }
    uptate(dto: any): Promise<RecordEntity> {
        return this.datasource.uptate(dto);
    }
    hiddeRecords(id: string): Promise<Boolean> {
        return this.datasource.hiddeRecords(id);
    }

}