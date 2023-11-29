import { CloudinaryUploadFileArgs } from "../../config";

export abstract class FileRepository {

    abstract uploadFile(uploadArgs: CloudinaryUploadFileArgs): Promise<boolean>;

    abstract deleteFile(id: string): Promise<boolean>;
}