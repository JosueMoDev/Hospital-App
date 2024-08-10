import { AllowedFolder } from '@config';
import { UploadDto } from '@domain/dtos';
import { FileEntity } from '@domain/entities';
import { UploadedFile } from 'express-fileupload';

export abstract class FileDataSource {
  abstract uploadFile(
    dto: UploadDto,
    file: UploadedFile,
    folder: AllowedFolder,
  ): Promise<FileEntity>;

  abstract deleteFile(id: string): Promise<{ [key: string]: string }>;
}
