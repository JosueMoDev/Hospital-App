import { CreateRecordDto, PaginationDto, RecordDataSource, RecordEntity, UpdateRecordDto } from "../../domain";

export class RecordDataSourceImpl implements RecordDataSource {

    async findOneById(id: string): Promise<RecordEntity> {
        return id as any
    }

    async findMany(dto: PaginationDto): Promise<RecordEntity[]> {
        return dto as any
    }
    async create(dto: CreateRecordDto): Promise<RecordEntity> {
        return dto as any;
    }
    async uptate(dto: UpdateRecordDto): Promise<RecordEntity> {
        return dto as any;
    }
    async hiddeRecords(id: string): Promise<Boolean> {
        return id as any
    }

}