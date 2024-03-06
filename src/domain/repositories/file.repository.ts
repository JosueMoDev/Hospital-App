import { CloudinaryUploadFileArgs } from "../../config";
import { FileEntity } from "../entities";

export abstract class FileRepository {

    abstract uploadFile(uploadArgs: CloudinaryUploadFileArgs): Promise<FileEntity>;

    abstract deleteFile(id: string): Promise<{ [key: string]: string }>;
}