import { AllowedFolder } from '@config';
import { FileDataSource } from '@domain/datasources';
import { UploadDto } from '@domain/dtos';
import { FileEntity } from '@domain/entities';
import { FileRepository } from '@domain/repositories';
import { UploadedFile } from 'express-fileupload';

export class FileRepositoryImpl implements FileRepository {
  constructor(private readonly datasource: FileDataSource) {}

  async uploadFile(
    dto: UploadDto,
    file: UploadedFile,
    folder: AllowedFolder,
  ): Promise<FileEntity> {
    return this.datasource.uploadFile(dto, file, folder);
  }
  async deleteFile(id: string): Promise<{ [key: string]: string }> {
    return this.datasource.deleteFile(id);
  }
}
