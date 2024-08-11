import { PaginationDto } from "@domain/dtos";
import { RecordEntity, PaginationEntity } from "@domain/entities";
import { RecordRepository } from "@domain/repositories";

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
