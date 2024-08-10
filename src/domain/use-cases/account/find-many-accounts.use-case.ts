import {
  AccountEntity,
  AccountRepository,
  PaginationDto,
  PaginationEntity,
} from '../../../domain';

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
