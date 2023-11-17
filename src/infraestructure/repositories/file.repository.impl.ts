import { FileDataSource, FileRepository } from "../../domain";

export class FileRepositoryImpl implements FileRepository {

    constructor(private readonly datasource: FileDataSource){}

    async uploadFile(): Promise<boolean> {
        return this.datasource.uploadFile();
    }
    async deleteFile(id: string): Promise<boolean> {
        return this.datasource.deleteFile(id);
    }

}