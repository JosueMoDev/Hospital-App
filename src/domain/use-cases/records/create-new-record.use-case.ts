import { CreateRecordDto } from '../../dtos';
import { RecordEntity } from '../../entities';
import { RecordRepository } from '../../repositories';

interface CreateRecordUseCase {
  excute(dto: CreateRecordDto): Promise<RecordEntity>;
}

export class CreaateRecord implements CreateRecordUseCase {
  constructor(private readonly recordRepository: RecordRepository) {}
  async excute(dto: CreateRecordDto): Promise<RecordEntity> {
    return await this.recordRepository.create(dto);
  }
}
