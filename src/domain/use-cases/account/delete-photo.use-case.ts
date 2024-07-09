import { AccountRepository, UploadDto } from "../..";

interface DeletePhotoUseCase {
  execute(uploadDto: UploadDto): Promise<Boolean>;
}

export class DeletePhoto implements DeletePhotoUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(uploadDto: UploadDto): Promise<Boolean> {
    return await this.accountRepository.deletePhoto(uploadDto);
  }
}
