import { PaginationDto } from '../../dtos';
import { PaginationEntity, RecordEntity } from '../../entities';
import { RecordRepository } from '../../repositories';

interface FindManyRecordUseCase {
  execute(
    dto: PaginationDto,
  ): Promise<{ records: RecordEntity[]; pagination: PaginationEntity }>;
}

export class FindManyRecords implements FindManyRecordUseCase {
  constructor(private readonly recordRepository: RecordRepository) {}
  async execute(
    dto: PaginationDto,
  ): Promise<{ records: RecordEntity[]; pagination: PaginationEntity }> {
    return await this.recordRepository.findMany(dto);
  }
}
