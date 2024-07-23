import { UploadedFile } from "express-fileupload";
import { CreateRecordDto, PaginationDto, PaginationEntity, RecordDataSource, RecordEntity, RecordRepository, UpdateRecordDto, UploadDto } from "../../domain";

export class RecordRepositoryImpl implements RecordRepository {

    constructor(private readonly datasource: RecordDataSource) { }
    uploadPDF(dto: UploadDto, file: UploadedFile): Promise<boolean> {
        return this.datasource.uploadPDF(dto, file);
    }
    deletePDF(dto: UploadDto): Promise<boolean> {
        return this.datasource.deletePDF(dto);
    }

    findOneById(id: string): Promise<RecordEntity> {
        return this.datasource.findOneById(id);
    }

    findMany(dto: PaginationDto): Promise<{ pagination: PaginationEntity, records: RecordEntity[] }> {
        return this.datasource.findMany(dto);
    }
    create(dto: CreateRecordDto): Promise<RecordEntity> {
        return this.datasource.create(dto);
    }
    uptate(dto: UpdateRecordDto): Promise<RecordEntity> {
        return this.datasource.uptate(dto);
    }
    changeRecordStatus(dto: UpdateRecordDto): Promise<boolean> {
        return this.datasource.changeRecordStatus(dto);
    }

}