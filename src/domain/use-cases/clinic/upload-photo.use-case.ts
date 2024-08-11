import { UploadDto } from '@domain/dtos';
import { ClinicRepository } from '@domain/repositories';
import { UploadedFile } from 'express-fileupload';


interface UploadPhotoUseCase {
  excute(uploadDto: UploadDto, uploadedFile: UploadedFile): Promise<Boolean>;
}

export class UploadClinicPhoto implements UploadPhotoUseCase {
  constructor(private readonly clinicRepository: ClinicRepository) {}
  async excute(
    uploadDto: UploadDto,
    uploadedFile: UploadedFile,
  ): Promise<Boolean> {
    return await this.clinicRepository.uploadPhoto(uploadDto, uploadedFile);
  }
}
