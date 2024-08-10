import { AccountRepository } from '../../../domain';

interface ChangeAccountStatusUseCase {
  execute(id: string): Promise<boolean>;
}

export class ChangeAccountStatus implements ChangeAccountStatusUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.accountRepository.changeStatusAccount(id);
  }
}
