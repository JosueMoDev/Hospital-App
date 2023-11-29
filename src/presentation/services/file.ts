import { UploadedFile } from "express-fileupload";
import { CustomError, FileRepository } from "../../domain";
import fs from 'fs';
import { Environment } from "../../config";


export class FileService {

    constructor(private readonly repository: FileRepository) { }

    private checkIfFolderExist(folderPath: string) {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    }

    public async uploadingFile(uploadArgs: any): Promise<any> {
        const { file, args } = uploadArgs;
        try {
            // ? Get File Extension
            const fileExtension = file.mimetype.split('/').at(1)!;

            this.checkIfFolderExist(Environment.TEMP_UPLOAD_PATH);

            const fileName = `${file.name}.${fileExtension}`;

            const temporaryDestination = `${Environment.TEMP_UPLOAD_PATH}/${fileName}`;
            // ? copy file on temp dir
            await file.mv(temporaryDestination);

            //? upload file to cloudinary
            const result = await this.repository.uploadFile({ filePath: temporaryDestination, fileConfig: { folder: args.folder, public_id: args.id } });

            // ? delete file from temp dir
            if (fs.existsSync(temporaryDestination)) fs.unlinkSync(temporaryDestination);

            return result
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

}