export abstract class FileDataSource {

    abstract uploadFile(): Promise<boolean>;
    
    abstract deleteFile(id: string): Promise<boolean>;
}