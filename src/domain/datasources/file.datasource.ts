export abstract class FileDataSource {

    abstract uploadFile(filePath: string): Promise<boolean>;

    abstract deleteFile(id: string): Promise<boolean>;
}