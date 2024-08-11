import { UploadDto } from "@domain/dtos";
import { ClinicRepository } from "@domain/repositories";

interface DeletePhotoUseCase {
  excute(uploadDto: UploadDto): Promise<Boolean>;
}

export class DeleteClinicPhoto implements DeletePhotoUseCase {
  constructor(private readonly clinicRepository: ClinicRepository) {}
  async excute(uploadDto: UploadDto): Promise<Boolean> {
    return await this.clinicRepository.deletePhoto(uploadDto);
  }
}
