import { CreateRecordDto, PaginationDto, RecordDataSource, RecordEntity, RecordRepository, UpdateRecordDto } from "../../domain";

export class RecordRepositoryImpl implements RecordRepository {

    constructor(private readonly datasource: RecordDataSource){}
    
    findOneById(id: string): Promise<RecordEntity> {
        throw new Error("Method not implemented.");
    }

    findMany(dto: PaginationDto): Promise<RecordEntity[]> {
        return this.datasource.findMany(dto);
    }
    create(dto: CreateRecordDto): Promise<RecordEntity> {
        return this.datasource.create(dto);
    }
    uptate(dto: UpdateRecordDto): Promise<RecordEntity> {
        return this.datasource.uptate(dto);
    }
    hiddeRecords(id: string): Promise<Boolean> {
        return this.datasource.hiddeRecords(id);
    }

}