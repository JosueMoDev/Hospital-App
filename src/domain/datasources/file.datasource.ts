import { UploadedFile } from "express-fileupload";
import { AllowedFolder } from "../../config";
import { FileEntity } from "../entities";
import { UploadDto } from "../dtos";

export abstract class FileDataSource {
  abstract uploadFile(
    dto: UploadDto,
    file: UploadedFile,
    folder: AllowedFolder
  ): Promise<FileEntity>;

  abstract deleteFile(id: string): Promise<{ [key: string]: string }>;
}