import { CloudinaryAdapter, CloudinaryUploadFileArgs } from "../../config";
import { FileDataSource, FileEntity } from "../../domain";

export class FileDataSourceImpl implements FileDataSource {

    async uploadFile(uploadArgs: CloudinaryUploadFileArgs): Promise<FileEntity> {
        const result = await CloudinaryAdapter.uploadFile(uploadArgs);
        return FileEntity.mapper(result);
    }
    async deleteFile(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}