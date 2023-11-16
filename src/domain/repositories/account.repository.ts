import { AccountEntity } from "../entities";

export abstract class AccountRepository {

    abstract findOneById(id: string): Promise<AccountEntity>;

    abstract getMany(by: string, limit: number, offset: number): Promise<AccountEntity[]>;

    abstract createAccount(dto: any): Promise<AccountEntity>;

    abstract updateAccount(dto: any): Promise<AccountEntity>;

    abstract changeStatusAccount(id: string): Promise<AccountEntity>;

    abstract changePasswordAccount(oldPassword: string, newPassword: string, id: string): Promise<Boolean>;

    abstract confirmPassword(password: string, id: string): Promise<Boolean>;
}