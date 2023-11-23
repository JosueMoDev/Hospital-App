import {
  AccountEntity,
  AccountRepository,
  CreateAccountDto,
  PaginationDto,
  UpdateAccountDto,
  UpdatePasswordDto,
} from "../../domain";

export class AccountService {
  constructor(private readonly repository: AccountRepository) { }

  public async findingAccountById(id: string): Promise<AccountEntity> {
    return await this.repository.findOneById(id);
  }

  public async findingManyAccounts(
    dto: PaginationDto
  ): Promise<AccountEntity[]> {
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

  public async changingPasswordAccoun(
    dto: UpdatePasswordDto
  ): Promise<Boolean> {
    return await this.repository.changePasswordAccount(dto);
  }

  public async checkingPassword(
    password: string,
    id: string
  ): Promise<Boolean> {
    return await this.repository.confirmPassword(password, id);
  }
}
