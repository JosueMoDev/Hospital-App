import { UploadedFile } from "express-fileupload";
import { CustomError, FileEntity, FileRepository, UploadDto } from "../../domain";
import fs from 'fs';
import { AllowedFolder, Environment } from "../../config";

interface UploadFileArgs {
    file: UploadedFile,
    args: {
        folder: AllowedFolder,
        public_id: string;
    }
}

export class FileService {

    constructor(private readonly repository: FileRepository) { }

    private checkIfFolderExist(folderPath: string) {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    }

    public async uploadingFile(uploadArgs: UploadFileArgs): Promise<FileEntity> {
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
            const result = await this.repository.uploadFile({ filePath: temporaryDestination, public_id: file.name, folder: args.folder });

            // ? delete file from temp dir
            if (fs.existsSync(temporaryDestination)) fs.unlinkSync(temporaryDestination);

            return result
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

    public async deletingFile(id: string): Promise<{ [key: string]: string }> {
        return await this.repository.deleteFile(id);
    }

}