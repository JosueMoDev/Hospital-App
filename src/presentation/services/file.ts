import { FileRepository } from "../../domain";

export class FileService {

    constructor(private readonly repository: FileRepository) { }
    
    public async uploadingPhoto(): Promise<any> {
        return await this.repository.uploadFile();
    }
    
}