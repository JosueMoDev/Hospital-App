import {
  AccountDataSource,
  AccountEntity,
  AccountRepository,
  CreateAccountDto,
  PaginationDto,
  UpdateAccountDto,
  ConfirmPasswordDto,
  UpdatePasswordDto,
} from "../../domain";

export class AccountRepositoryImpl implements AccountRepository {
  constructor(private readonly datasource: AccountDataSource) { }

  findOneById(id: string): Promise<AccountEntity> {
    return this.datasource.findOneById(id);
  }

  findMany(dto: PaginationDto): Promise<AccountEntity[]> {
    return this.datasource.findMany(dto);
  }

  createAccount(dto: CreateAccountDto): Promise<AccountEntity> {
    return this.datasource.createAccount(dto);
  }

  updateAccount(dto: UpdateAccountDto): Promise<AccountEntity> {
    return this.datasource.updateAccount(dto);
  }
  changeStatusAccount(dto: UpdateAccountDto): Promise<AccountEntity> {
    return this.datasource.changeStatusAccount(dto);
  }

  changePasswordAccount(dto: UpdatePasswordDto): Promise<Boolean> {
    return this.datasource.changePasswordAccount(dto);
  }

  confirmPassword(dto: ConfirmPasswordDto): Promise<Boolean> {
    return this.datasource.confirmPassword(dto);
  }
}
