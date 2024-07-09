import { AccountRepository, ConfirmPasswordDto } from "../../../domain";

interface CheckPasswordUseCase {
  execute(confirmPasswordDto: ConfirmPasswordDto): Promise<Boolean>;
}

export class CheckPassword implements CheckPasswordUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(confirmPasswordDto: ConfirmPasswordDto): Promise<Boolean> {
    return await this.accountRepository.confirmPassword(confirmPasswordDto);
  }
}
