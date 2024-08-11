import { UploadDto } from "@domain/dtos";
import { AccountRepository } from "@domain/repositories";

interface DeletePhotoUseCase {
  execute(dto: UploadDto): Promise<boolean>;
}

export class DeletePhoto implements DeletePhotoUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(dto: UploadDto): Promise<boolean> {
    return await this.accountRepository.deleteFile(dto);
  }
}
