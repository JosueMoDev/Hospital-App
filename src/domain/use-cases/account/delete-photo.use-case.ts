import { AccountRepository, UploadDto } from "../../../domain";

interface DeletePhotoUseCase {
  execute(dto: UploadDto): Promise<boolean>;
}

export class DeletePhoto implements DeletePhotoUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(dto: UploadDto): Promise<boolean> {
    return await this.accountRepository.deletePhoto(dto);
  }
}
