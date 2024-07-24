import { UpdateRecordDto } from '../../dtos';
import { RecordEntity } from '../../entities';
import { RecordRepository } from '../../repositories';

interface UpdateRecordUseCase {
  execute(dto: UpdateRecordDto): Promise<RecordEntity>;
}

export class UpdateRecord implements UpdateRecordUseCase {
  constructor(private readonly recordRepository: RecordRepository) {}
  async execute(dto: UpdateRecordDto): Promise<RecordEntity> {
    return await this.recordRepository.uptate(dto);
  }
}
