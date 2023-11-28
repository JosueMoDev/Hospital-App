import { UploadedFile } from "express-fileupload";
import { CustomError, FileRepository } from "../../domain";
import path from "path";
import fs from 'fs';
import { UuidAdapter } from "../../config";


export class FileService {

    constructor(private readonly repository: FileRepository) { }

    private checkFolder(folderPath: string) {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    }

    public async uploadingFile(file: UploadedFile): Promise<any> {
        try {
            const isValidFileExtension = ['png', 'jpg', 'jpge', 'pdf'];
            const fileExtension: string = file.mimetype.split('/').at(1) ?? '';
            if (!isValidFileExtension.includes(fileExtension)) {
                throw CustomError
                    .badRequest(`Invalid extension: ${fileExtension}, valid ones ${isValidFileExtension}`);
            }

            const destination = path.resolve(__dirname, '../../../', 'uploads');
            this.checkFolder(destination);

            const fileName = `${UuidAdapter.uuidv4()}.${fileExtension}`;
            const temporaryDestination = `${destination}/${fileName}`;
            file.mv(temporaryDestination);
            // verificar que la funcion mv hay podido crear la imagen sino lanzar excepcion
            return await this.repository.uploadFile(temporaryDestination);

        } catch (error) {

            // console.log({error});
            throw error;

        }

    }

}