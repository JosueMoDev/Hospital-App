import { UploadedFile } from "express-fileupload";
import { CreateRecordDto, PaginationDto, PaginationEntity, RecordEntity, RecordRepository, UploadDto } from "../../domain";
import { UpdateRecordDto } from "../../domain/dtos/record/updateRecord.dto";

export class RecordService {
  constructor(private readonly repository: RecordRepository) { }

  public async creatingRecord(dto: CreateRecordDto): Promise<RecordEntity> {
    return await this.repository.create(dto);
  }

  public async updatingRecord(dto: UpdateRecordDto): Promise<RecordEntity> {
    return await this.repository.uptate(dto);
  }

  public async findingOneById(id: string): Promise<RecordEntity> {
    return await this.repository.findOneById(id);
  }

  public async findingMany(dto: PaginationDto): Promise<{ pagination: PaginationEntity, records: RecordEntity[] }> {
    return await this.repository.findMany(dto);
  }

  public async changingRecordStatus(dto: UpdateRecordDto): Promise<RecordEntity> {
    return await this.repository.changeRecordStatus(dto);
  }
  public async uploadingPdf(dto: UploadDto, file: UploadedFile): Promise<boolean> {
    return await this.repository.uploadPDF(dto, file)
  }

  public async deletingPdf(dto: UploadDto): Promise<boolean> {
    return await this.repository.deletePDF(dto);
  }
}