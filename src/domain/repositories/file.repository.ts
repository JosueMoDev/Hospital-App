import { UploadedFile } from "express-fileupload";
import { AllowedFolder } from "../../config";
import { UploadDto } from "../dtos";
import { FileEntity } from "../entities";

export abstract class FileRepository {
  abstract uploadFile(
    dto: UploadDto,
    file: UploadedFile,
    folder: AllowedFolder
  ): Promise<FileEntity>;

  abstract deleteFile(id: string): Promise<{ [key: string]: string }>;
}