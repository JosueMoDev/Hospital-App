import { FileDataSource, FileRepository } from "../../domain";

export class FileRepositoryImpl implements FileRepository {

    constructor(private readonly datasource: FileDataSource) { }

    async uploadFile(filePath: string): Promise<boolean> {
        return this.datasource.uploadFile(filePath);
    }
    async deleteFile(id: string): Promise<boolean> {
        return this.datasource.deleteFile(id);
    }

}