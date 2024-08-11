import { ConfirmPasswordDto } from "@domain/dtos";
import { AccountRepository } from "@domain/repositories";

interface CheckPasswordUseCase {
  execute(confirmPasswordDto: ConfirmPasswordDto): Promise<boolean>;
}

export class CheckPassword implements CheckPasswordUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(confirmPasswordDto: ConfirmPasswordDto): Promise<boolean> {
    return await this.accountRepository.confirmPassword(confirmPasswordDto);
  }
}
