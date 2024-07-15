import { AccountRepository, UploadDto } from "../..";

interface DeletePhotoUseCase {
  execute(id: string): Promise<Boolean>;
}

export class DeletePhoto implements DeletePhotoUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(id: string): Promise<Boolean> {
    return await this.accountRepository.deletePhoto(id);
  }
}
