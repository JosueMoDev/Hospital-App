import { UploadedFile } from "express-fileupload";
import { ClinicRepository, UploadDto } from "../../../domain";

interface UploadPhotoUseCase {
  excute(uploadDto: UploadDto, uploadedFile: UploadedFile): Promise<Boolean>;
}

export class UploadClinicPhoto implements UploadPhotoUseCase {
  constructor(private readonly clinicRepository: ClinicRepository) {}
  async excute(uploadDto: UploadDto, uploadedFile: UploadedFile): Promise<Boolean> {
    return await this.clinicRepository.uploadPhoto(uploadDto, uploadedFile);
  }
}
