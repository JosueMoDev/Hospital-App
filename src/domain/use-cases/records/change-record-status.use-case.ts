import { UpdateRecordDto } from "@domain/dtos";
import { RecordRepository } from "@domain/repositories";


interface ChangeRecordStatusUseCase {
  execute(dto: UpdateRecordDto): Promise<boolean>;
}

export class ChangeRecordStatus implements ChangeRecordStatusUseCase {
  constructor(private readonly recordReposiroty: RecordRepository) {}
  async execute(dto: UpdateRecordDto): Promise<boolean> {
    return await this.recordReposiroty.changeRecordStatus(dto);
  }
}
