import { AccountDataSource, AccountEntity, CreateAccountDto, PaginationDto } from "../../domain";

export class AccountDataSourceImpl implements AccountDataSource {

    async findOneById(id: string): Promise<AccountEntity> {
        return id as any;
    }
    async findMany(dto: PaginationDto): Promise<AccountEntity[]> {
        return dto as any;
    }
    async createAccount(dto: CreateAccountDto): Promise<AccountEntity> {
        return dto as AccountEntity;
    }
    async updateAccount(dto: any): Promise<AccountEntity> {
        return dto as AccountEntity;
    }
    async changeStatusAccount(id: string): Promise<AccountEntity> {
        return id as any;
    }
    async changePasswordAccount(oldPassword: string, newPassword: string, id: string): Promise<Boolean> {
        // TODO: Create dto for change password 
        return { oldPassword, newPassword, id } as any;
    }
    async confirmPassword(password: string, id: string): Promise<Boolean> {
        return { password, id } as any;
    }

}