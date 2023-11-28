import { CreateAccountDto, PaginationDto, UpdateAccountDto, ConfirmPasswordDto, UpdatePasswordDto } from "../dtos";
import { AccountEntity } from "../entities";
import { PaginationEntity } from '../entities/pagination.entity';

export abstract class AccountDataSource {

    abstract findOneById(id: string): Promise<AccountEntity>;

    abstract findMany(dto: PaginationDto): Promise<{ pagination: PaginationEntity, accounts: AccountEntity[] }>;

    abstract createAccount(dto: CreateAccountDto): Promise<AccountEntity>;

    abstract updateAccount(dto: UpdateAccountDto): Promise<AccountEntity>;

    abstract changeStatusAccount(dto: UpdateAccountDto): Promise<AccountEntity>;

    abstract changePasswordAccount(dto: UpdatePasswordDto): Promise<Boolean>;

    abstract confirmPassword(dto: ConfirmPasswordDto): Promise<Boolean>;
}