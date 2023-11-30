import { CloudinaryUploadFileArgs } from "../../config";
import { FileEntity } from "../entities";

export abstract class FileDataSource {

    abstract uploadFile(uploadArgs: CloudinaryUploadFileArgs): Promise<FileEntity>;

    abstract deleteFile(id: string): Promise<boolean>;
}