import { UploadedFile } from "express-fileupload";
import { AccountRepository, UploadDto } from "../../../domain";

interface UploadPhotoUseCase {
  execute(uploadDto: UploadDto, file: UploadedFile): Promise<Boolean>;
}

export class UploadPhoto implements UploadPhotoUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(uploadDto: UploadDto, file: UploadedFile): Promise<Boolean> {
    return await this.accountRepository.uploadPhoto(uploadDto, file);
  }
}
