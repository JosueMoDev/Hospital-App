import { UploadDto } from '@domain/dtos';
import { AccountRepository } from '@domain/repositories';
import { UploadedFile } from 'express-fileupload';

interface UploadPhotoUseCase {
  execute(dto: UploadDto, file: UploadedFile): Promise<boolean>;
}

export class UploadPhoto implements UploadPhotoUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(dto: UploadDto, file: UploadedFile): Promise<boolean> {
    return await this.accountRepository.uploadFile(dto, file);
  }
}
