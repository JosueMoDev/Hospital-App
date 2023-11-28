import { FileDataSource } from "../../domain";

export class FileDataSourceImpl implements FileDataSource {

    async uploadFile(filePath: string): Promise<boolean> {

        console.log(filePath);
        return true;
    }
    async deleteFile(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}