import { PaginationDto } from "@domain/dtos";
import { PaginationEntity, AccountEntity } from "@domain/entities";
import { AccountRepository } from "@domain/repositories";


interface FindManyAccountsUseCase {
  execute(
    paginationDto: PaginationDto,
  ): Promise<{ pagination: PaginationEntity; accounts: AccountEntity[] }>;
}

export class FindManyAccounts implements FindManyAccountsUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(
    paginationDto: PaginationDto,
  ): Promise<{ pagination: PaginationEntity; accounts: AccountEntity[] }> {
    return await this.accountRepository.findMany(paginationDto);
  }
}
