import { AccountDataSource, AccountEntity, AccountRepository } from "../../domain";

export class AccountRepositoryImpl implements AccountRepository {

    constructor(private readonly datasource: AccountDataSource){}

    findOneById(id: string): Promise<AccountEntity> {
        return this.datasource.findOneById(id);
    }
    getMany(by: string, limit: number, offset: number): Promise<AccountEntity[]> {
        return this.getMany(by, limit, offset);
    }
    createAccount(dto: any): Promise<AccountEntity> {
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