import {
  AccountEntity,
  AccountRepository,
} from "../../../domain";

interface FindAccountByIdUseCase {
  execute(id: string): Promise<AccountEntity>;
}

export class FindAccountById implements FindAccountByIdUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(id: string): Promise<AccountEntity> {
    return await this.accountRepository.findOneById(id);
  }
}
