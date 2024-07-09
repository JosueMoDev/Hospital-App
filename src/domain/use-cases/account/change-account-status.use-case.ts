import {
  AccountEntity,
  AccountRepository,
  UpdateAccountDto,
} from "../../../domain";

interface ChangeAccountStatusUseCase {
  execute(updateAccountDto: UpdateAccountDto): Promise<AccountEntity>;
}

export class ChangeAccountStatus implements ChangeAccountStatusUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(updateAccountDto: UpdateAccountDto): Promise<AccountEntity> {
    return await this.accountRepository.changeStatusAccount(updateAccountDto);
  }
}
