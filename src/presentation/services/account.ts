import {
  AccountEntity,
  AccountRepository,
  CreateAccountDto,
  PaginationDto,
  UpdateAccountDto,
  ConfirmPasswordDto,
  UpdatePasswordDto,
  PaginationEntity,
} from "../../domain";

export class AccountService {
  constructor(private readonly repository: AccountRepository) { }

  public async findingAccountById(id: string): Promise<AccountEntity> {
    return await this.repository.findOneById(id);
  }

  public async findingManyAccounts(
    dto: PaginationDto
  ): Promise<{ pagination: PaginationEntity, accounts: AccountEntity[] }> {
    return await this.repository.findMany(dto);
  }

  public async creatingAccount(dto: CreateAccountDto): Promise<AccountEntity> {
    return await this.repository.createAccount(dto);
  }

  public async updatingAccount(dto: UpdateAccountDto): Promise<AccountEntity> {
    return await this.repository.updateAccount(dto);
  }

  public async changingStatusAccount(dto: UpdateAccountDto): Promise<AccountEntity> {
    return await this.repository.changeStatusAccount(dto);
  }

  public async changingPasswordAccount(
    dto: UpdatePasswordDto
  ): Promise<Boolean> {
    return await this.repository.changePasswordAccount(dto);
  }

  public async checkingPassword(
    dto: ConfirmPasswordDto
  ): Promise<Boolean> {
    return await this.repository.confirmPassword(dto);
  }
}
