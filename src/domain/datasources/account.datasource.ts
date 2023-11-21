import { CreateAccountDto, PaginationDto } from "../dtos";
import { AccountEntity } from "../entities";

export abstract class AccountDataSource {

    abstract findOneById(id: string): Promise<AccountEntity>;

    abstract findMany(dto: PaginationDto): Promise<AccountEntity[]>;

    abstract createAccount(dto: CreateAccountDto): Promise<AccountEntity>;

    abstract updateAccount(dto: any): Promise<AccountEntity>;

    abstract changeStatusAccount(id: string): Promise<AccountEntity>;

    abstract changePasswordAccount(oldPassword: string, newPassword: string, id: string): Promise<Boolean>;

    abstract confirmPassword(password: string, id: string): Promise<Boolean>;
}