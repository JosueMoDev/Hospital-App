import { UploadedFile } from 'express-fileupload';
import { AccountRepository, UploadDto } from '../../../domain';

interface UploadPhotoUseCase {
  execute(dto: UploadDto, file: UploadedFile): Promise<boolean>;
}

export class UploadPhoto implements UploadPhotoUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(dto: UploadDto, file: UploadedFile): Promise<boolean> {
    return await this.accountRepository.uploadFile(dto, file);
  }
}
