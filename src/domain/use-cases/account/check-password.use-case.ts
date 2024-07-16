import { AccountRepository, ConfirmPasswordDto } from "../../../domain";

interface CheckPasswordUseCase {
  execute(confirmPasswordDto: ConfirmPasswordDto): Promise<boolean>;
}

export class CheckPassword implements CheckPasswordUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(confirmPasswordDto: ConfirmPasswordDto): Promise<boolean> {
    return await this.accountRepository.confirmPassword(confirmPasswordDto);
  }
}
