import { AccountEntity, AccountRepository, CreateAccountDto, PaginationDto, UpdateAccountDto } from "../../domain";

export class AccountService {

    constructor(private readonly repository: AccountRepository) { }

    public async findingAccountById(id: string): Promise<AccountEntity> {
        return await this.repository.findOneById(id);
    }

    public async findingManyAccounts(by: string, dto: PaginationDto): Promise<AccountEntity[]> {
        return await this.repository.findMany(by, dto);
    }

    public async creatingAccount(dto: CreateAccountDto): Promise<AccountEntity> {
        return await this.repository.createAccount(dto);
    }

    public async updatingAccount(dto: UpdateAccountDto): Promise<AccountEntity> {
        return await this.repository.updateAccount(dto);
    }

    public async changingStatusAccount(id: string): Promise<AccountEntity> {
        return await this.repository.changeStatusAccount(id);
    }

    public async changingPasswordAccoun(oldPassword: string, id: string, password: string): Promise<Boolean> {
        return await this.repository.changePasswordAccount(oldPassword, id, password);
    }

    public async checkingPassword(password: string, id: string): Promise<Boolean> {
        return await this.repository.confirmPassword(password, id);
    }


}