export abstract class FileRepository {

    abstract uploadFile(filePath: string): Promise<boolean>;

    abstract deleteFile(id: string): Promise<boolean>;
}