import { CreateRecordDto, RecordEntity, RecordRepository } from "../../domain";
import { UpdateRecordDto } from "../../domain/dtos/record/updateRecord.dto";

export class RecordService {
  constructor(private readonly repository: RecordRepository) {}

  public async creatingRecord(dto: CreateRecordDto): Promise<RecordEntity> {
    return await this.repository.create(dto);
  }

  public async updatingRecord(dto: UpdateRecordDto): Promise<RecordEntity> {
    return await this.repository.uptate(dto);
  }
}