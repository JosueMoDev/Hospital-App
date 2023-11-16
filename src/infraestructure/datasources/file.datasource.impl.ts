import { FileDataSource } from "../../domain";

export class FileDataSourceImpl implements FileDataSource {

    async uploadFile(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async deleteFile(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}