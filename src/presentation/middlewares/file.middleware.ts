import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

enum AllowedExtensions {
  PNG = 'png',
  JPG = 'jpg',
  JPEG = 'jpeg',
  PDF = 'pdf',
}
export class FileUploadMiddleware {
  static containFiles(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const fileUploaded = request.files;
    if (!fileUploaded || Object.keys(fileUploaded).length === 0) {
      return response.status(400).json({ error: 'No files were selected' });
    }

    const fileToBody = !Array.isArray(fileUploaded.file)
      ? (request.body.files = [fileUploaded.file])
      : (request.body.files = fileUploaded.file);

    const file = fileToBody.at(0) as UploadedFile;
    const fileExtension: string = file.mimetype.split('/').at(1)!;
    const isExtensionAllow = Object.values(AllowedExtensions).includes(
      fileExtension as AllowedExtensions,
    );
    if (!isExtensionAllow)
      return response
        .status(400)
        .json({
          error: `Extension File must be included in ${Object.values(AllowedExtensions)}`,
        });
    next();
  }
}
