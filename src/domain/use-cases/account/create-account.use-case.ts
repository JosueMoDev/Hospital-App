import { CreateAccountDto } from "@domain/dtos";
import { AccountEntity } from "@domain/entities";
import { AccountRepository } from "@domain/repositories";

interface CreateAccountUseCase {
  execute(createAccountDto: CreateAccountDto): Promise<AccountEntity>;
}

export class CreateAccount implements CreateAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    return await this.accountRepository.createAccount(createAccountDto);
  }
}
