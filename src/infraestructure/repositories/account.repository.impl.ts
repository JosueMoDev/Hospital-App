import { AccountDataSource, AccountEntity, AccountRepository, CreateAccountDto, PaginationDto } from "../../domain";

export class AccountRepositoryImpl implements AccountRepository {

    constructor(private readonly datasource: AccountDataSource){}

    findOneById(id: string): Promise<AccountEntity> {
        return this.datasource.findOneById(id);
    }
    getMany(by: string, dto: PaginationDto): Promise<AccountEntity[]> {
        return this.getMany(by, dto);
    }
    createAccount(dto: CreateAccountDto): Promise<AccountEntity> {
        return this.datasource.createAccount(dto);
    }
    updateAccount(dto: any): Promise<AccountEntity> {
        return this.datasource.updateAccount(dto);
    }
    changeStatusAccount(id: string): Promise<AccountEntity> {
        return this.datasource.changeStatusAccount(id);
    }
    changePasswordAccount(oldPassword: string, newPassword: string, id: string): Promise<Boolean> {
        return this.datasource.changePasswordAccount(oldPassword, newPassword, id);
    }
    confirmPassword(password: string, id: string): Promise<Boolean> {
        return this.datasource.confirmPassword(password, id);
    }

}