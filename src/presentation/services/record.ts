import { CreateRecordDto, PaginationDto, RecordEntity, RecordRepository } from "../../domain";
import { UpdateRecordDto } from "../../domain/dtos/record/updateRecord.dto";

export class RecordService {
  constructor(private readonly repository: RecordRepository) { }

  public async creatingRecord(dto: CreateRecordDto): Promise<RecordEntity> {
    return await this.repository.create(dto);
  }

  public async updatingRecord(dto: UpdateRecordDto): Promise<RecordEntity> {
    return await this.repository.uptate(dto);
  }

  public async findingOneById(id: string): Promise<RecordEntity> {
    return await this.repository.findOneById(id);
  }

  public async findingMany(dto: PaginationDto): Promise<RecordEntity[]> {
    return await this.repository.findMany(dto);
  }

  public async hiddingRecord(id: string): Promise<Boolean> {
    return await this.repository.hiddeRecords(id);
  }
}