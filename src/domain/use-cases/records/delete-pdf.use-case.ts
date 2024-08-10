import { UploadDto } from '../../dtos';
import { RecordRepository } from '../../repositories';

interface DeleteRecordPDFUseCase {
  execute(dto: UploadDto): Promise<boolean>;
}

export class DeleteRecordPDF implements DeleteRecordPDFUseCase {
  constructor(private readonly recordRepository: RecordRepository) {}
  async execute(dto: UploadDto): Promise<boolean> {
    return await this.recordRepository.deletePDF(dto);
  }
}
