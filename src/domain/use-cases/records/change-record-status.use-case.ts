import { UpdateRecordDto } from "../../dtos";
import { RecordEntity } from "../../entities";
import { RecordRepository } from "../../repositories";

interface ChangeRecordStatusUseCase {
  execute(dto: UpdateRecordDto): Promise<RecordEntity>;
}

export class ChangeRecordStatus implements ChangeRecordStatusUseCase {
  constructor(private readonly recordReposiroty: RecordRepository) {}
  async execute(dto: UpdateRecordDto): Promise<RecordEntity> {
    return await this.recordReposiroty.changeRecordStatus(dto);
  }
}
