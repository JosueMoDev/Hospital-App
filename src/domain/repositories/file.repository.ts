export abstract class FileRepository {
    abstract uploadFile(): Promise<boolean>;
    abstract deleteFile(id: string): Promise<boolean>;
}