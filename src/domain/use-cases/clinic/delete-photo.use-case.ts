import { ClinicRepository, UploadDto } from "../../../domain";

interface DeletePhotoUseCase {
  excute(uploadDto: UploadDto): Promise<Boolean>;
}

export class DeleteClinicPhoto implements DeletePhotoUseCase {
  constructor(private readonly clinicRepository: ClinicRepository) {}
  async excute(uploadDto: UploadDto): Promise<Boolean> {
    return await this.clinicRepository.deletePhoto(uploadDto);
  }
}
