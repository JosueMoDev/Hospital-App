import { UploadedFile } from "express-fileupload";
import { AccountRepository } from "../../../domain";

interface UploadPhotoUseCase {
  execute(id: string, file: UploadedFile): Promise<boolean>;
}

export class UploadPhoto implements UploadPhotoUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(id: string, file: UploadedFile): Promise<boolean> {
    return await this.accountRepository.uploadPhoto(id, file);
  }
}
