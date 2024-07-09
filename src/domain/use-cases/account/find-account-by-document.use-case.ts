import { AccountEntity, AccountRepository } from "../../../domain";

interface FindAccountByDocumentUseCase {
  execute(document: string): Promise<AccountEntity>;
}

export class FindAccountByDocument implements FindAccountByDocumentUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(document: string): Promise<AccountEntity> {
    return await this.accountRepository.findOneByDocument(document);
  }
}
