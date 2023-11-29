import { Request, Response } from "express";
import { FileService } from "../../services";
import { HandlerError } from "../../../domain";
import type { UploadedFile } from "express-fileupload";


export class FileController {

    constructor(private readonly fileService: FileService) { }

    uploadPhoto = (request: Request, response: Response) => {
        const file = request.body.files.at(0) as UploadedFile;
        this.fileService.uploadingFile(file)
            .then(uploaded => response.json(uploaded))
            .catch((error) => {
                const { statusCode, errorMessage } = HandlerError.hasError(error);
                return response.status(statusCode).json({ error: errorMessage });
            });
    }

}