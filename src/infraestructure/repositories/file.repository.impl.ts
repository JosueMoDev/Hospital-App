import { CloudinaryUploadFileArgs } from "../../config";
import { FileDataSource, FileRepository } from "../../domain";

export class FileRepositoryImpl implements FileRepository {

    constructor(private readonly datasource: FileDataSource) { }

    async uploadFile(uploadArgs: CloudinaryUploadFileArgs): Promise<boolean> {
        return this.datasource.uploadFile(uploadArgs);
    }
    async deleteFile(id: string): Promise<boolean> {
        return this.datasource.deleteFile(id);
    }

}