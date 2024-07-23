import { UploadedFile } from "express-fileupload";
import { AllowedFolder, CloudinaryAdapter, Environment } from "../../config";
import { CustomError, FileDataSource, FileEntity, UploadDto } from "../../domain";
import fs from 'fs';

export class FileDataSourceImpl implements FileDataSource {
  private checkIfFolderExist(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }
  async uploadFile(
    dto: UploadDto,
    file: UploadedFile,
    folder: AllowedFolder
  ): Promise<any> {
    try {
      // ? Get File Extension
      const fileExtension = file.mimetype.split("/").at(1)!;

      this.checkIfFolderExist(Environment.TEMP_UPLOAD_PATH);

      const fileName = `${dto.id}.${fileExtension}`;

      const temporaryDestination = `${Environment.TEMP_UPLOAD_PATH}/${fileName}`;
      // ? copy file on temp dir
      await file.mv(temporaryDestination);

      //? upload file to cloudinary
      const result = await CloudinaryAdapter.uploadFile({
        filePath: temporaryDestination,
        public_id: fileName,
        folder,
      });
      // ? delete file from temp dir
      if (fs.existsSync(temporaryDestination))
        fs.unlinkSync(temporaryDestination);
        return FileEntity.mapper(result);
   
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  async deleteFile(id: string): Promise<{ [key: string]: string }> {
    return await CloudinaryAdapter.deleteFile(id);
  }

}