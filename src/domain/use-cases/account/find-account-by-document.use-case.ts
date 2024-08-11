import { AccountEntity } from "@domain/entities";
import { AccountRepository } from "@domain/repositories";

interface FindAccountByDocumentUseCase {
  execute(document: string): Promise<AccountEntity>;
}

export class FindAccountByDocument implements FindAccountByDocumentUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(document: string): Promise<AccountEntity> {
    return await this.accountRepository.findOneByDocument(document);
  }
}
