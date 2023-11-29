import { UploadedFile } from "express-fileupload";
import { CustomError, FileRepository } from "../../domain";
import path from "path";
import fs from 'fs';


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

            const fileName = `${file.name}.${fileExtension}`;
            const temporaryDestination = `${destination}/${fileName}`;
            file.mv(temporaryDestination);
            // verificar que la funcion mv hay podido crear la imagen sino lanzar excepcion
            const result = await this.repository.uploadFile(temporaryDestination);

            try {
                const wasdeleted = fs.unlinkSync(temporaryDestination);
                const r = fs.existsSync(
                  temporaryDestination
                );
                console.log({exists: r, wasdeleted})
            } catch (error) {
                console.log(error);
            } 
                

            return result


            

        } catch (error) {

            // console.log({error});
            throw error;

        }

    }

}