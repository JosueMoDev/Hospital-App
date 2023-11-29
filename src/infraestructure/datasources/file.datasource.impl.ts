import { CloudinaryAdapter, CloudinaryUploadFileArgs } from "../../config";
import { FileDataSource } from "../../domain";

export class FileDataSourceImpl implements FileDataSource {

    async uploadFile(uploadArgs: CloudinaryUploadFileArgs): Promise<any> {
        return await CloudinaryAdapter.uploadFile(uploadArgs)

    }
    async deleteFile(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}