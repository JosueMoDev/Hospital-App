import { CreateRecordDto, RecordEntity, RecordRepository } from "../../domain";

export class RecordService {

    constructor(private readonly repository: RecordRepository) { }
    
    public async creatingRecord(dto: CreateRecordDto): Promise<RecordEntity> {
        return await this.repository.create(dto);
    }
    
}