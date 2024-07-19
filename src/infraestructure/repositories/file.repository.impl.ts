import { UploadedFile } from "express-fileupload";
import { AllowedFolder} from "../../config";
import { FileDataSource, FileEntity, FileRepository, UploadDto } from "../../domain";

export class FileRepositoryImpl implements FileRepository {
  constructor(private readonly datasource: FileDataSource) {}

  async uploadFile(
    dto: UploadDto,
    file: UploadedFile,
    folder: AllowedFolder
  ): Promise<FileEntity> {
    return this.datasource.uploadFile(dto, file, folder);
  }
  async deleteFile(id: string): Promise<{ [key: string]: string }> {
    return this.datasource.deleteFile(id);
  }
}