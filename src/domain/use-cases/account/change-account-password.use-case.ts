import {
  AccountRepository,
  UpdatePasswordDto,
} from "../../../domain";

interface ChangeAccountPasswordUseCase {
  execute(updatePasswordDto: UpdatePasswordDto): Promise<Boolean>;
}

export class ChangeAccountPassword implements ChangeAccountPasswordUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(updatePasswordDto: UpdatePasswordDto): Promise<Boolean> {
    return await this.accountRepository.changePasswordAccount(updatePasswordDto);
  }
}
