import { CreateRecordDto } from "@domain/dtos";
import { RecordEntity } from "@domain/entities";
import { RecordRepository } from "@domain/repositories";


interface CreateRecordUseCase {
  excute(dto: CreateRecordDto): Promise<RecordEntity>;
}

export class CreaateRecord implements CreateRecordUseCase {
  constructor(private readonly recordRepository: RecordRepository) {}
  async excute(dto: CreateRecordDto): Promise<RecordEntity> {
    return await this.recordRepository.create(dto);
  }
}
