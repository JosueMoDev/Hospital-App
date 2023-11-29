import { CloudinaryUploadFileArgs } from "../../config";

export abstract class FileDataSource {

    abstract uploadFile(uploadArgs: CloudinaryUploadFileArgs): Promise<boolean>;

    abstract deleteFile(id: string): Promise<boolean>;
}