import { RecordEntity } from '../../entities';
import { RecordRepository } from '../../repositories';

interface FindOneRecordByIdUseCase {
  execute(id: string): Promise<RecordEntity>;
}

export class FindOneRecordById implements FindOneRecordByIdUseCase {
  constructor(private readonly recordRepository: RecordRepository) {}
  async execute(id: string): Promise<RecordEntity> {
    return await this.recordRepository.findOneById(id);
  }
}
