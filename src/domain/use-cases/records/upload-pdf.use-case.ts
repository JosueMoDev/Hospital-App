import { UploadedFile } from "express-fileupload";
import { UploadDto } from "../../dtos";
import { RecordRepository } from "../../repositories";

interface UploadRecordPDFUseCase {
  execute(dto: UploadDto, file: UploadedFile): Promise<boolean>;
}

export class UploadRecordPDF implements UploadRecordPDFUseCase {
  constructor(private readonly recordRepository: RecordRepository) {}
  async execute(dto: UploadDto, file: UploadedFile): Promise<boolean> {
    return await this.recordRepository.uploadPDF(dto, file);
  }
}
