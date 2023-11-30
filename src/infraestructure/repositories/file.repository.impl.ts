import { CloudinaryUploadFileArgs } from "../../config";
import { FileDataSource, FileEntity, FileRepository } from "../../domain";

export class FileRepositoryImpl implements FileRepository {

    constructor(private readonly datasource: FileDataSource) { }

    async uploadFile(uploadArgs: CloudinaryUploadFileArgs): Promise<FileEntity> {
        return this.datasource.uploadFile(uploadArgs);
    }
    async deleteFile(id: string): Promise<boolean> {
        return this.datasource.deleteFile(id);
    }

}