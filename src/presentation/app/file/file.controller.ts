import { Request, Response } from "express";
import { FileService } from "../../services";
import { HandlerError } from "../../../domain";

export class FileController {

    constructor(private readonly fileService: FileService) { }
    
    uploadPhoto = (request: Request, response: Response) => {
        // TODO: Create Dto for files
        this.fileService
        .uploadingPhoto() // aqui debe ir el dto
        .then((resoult) => response.json(resoult))
        .catch((error) => {
            const { statusCode, errorMessage } = HandlerError.hasError(error);
            return response.status(statusCode).json({ error: errorMessage });
        });
    }
    
}