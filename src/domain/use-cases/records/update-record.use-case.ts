import { UpdateRecordDto } from "@domain/dtos";
import { RecordEntity } from "@domain/entities";
import { RecordRepository } from "@domain/repositories";


interface UpdateRecordUseCase {
  execute(dto: UpdateRecordDto): Promise<RecordEntity>;
}

export class UpdateRecord implements UpdateRecordUseCase {
  constructor(private readonly recordRepository: RecordRepository) {}
  async execute(dto: UpdateRecordDto): Promise<RecordEntity> {
    return await this.recordRepository.uptate(dto);
  }
}
