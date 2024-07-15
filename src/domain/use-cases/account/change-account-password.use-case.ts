import {
  AccountRepository,
  ChangePasswordDto,
} from "../../../domain";

interface ChangeAccountPasswordUseCase {
  execute(changePasswordDto: ChangePasswordDto): Promise<Boolean>;
}

export class ChangeAccountPassword implements ChangeAccountPasswordUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(changePasswordDto: ChangePasswordDto): Promise<Boolean> {
    return await this.accountRepository.changePasswordAccount(changePasswordDto);
  }
}
