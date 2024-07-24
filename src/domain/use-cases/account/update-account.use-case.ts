import {
  AccountEntity,
  AccountRepository,
  UpdateAccountDto,
} from '../../../domain';

interface UpdateAccountUseCase {
  execute(updateAccountDto: UpdateAccountDto): Promise<AccountEntity>;
}

export class UpdateAccount implements UpdateAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(updateAccountDto: UpdateAccountDto): Promise<AccountEntity> {
    return await this.accountRepository.updateAccount(updateAccountDto);
  }
}
