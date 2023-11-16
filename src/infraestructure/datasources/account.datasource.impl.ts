import { AccountDataSource, AccountEntity } from "../../domain";

export class AccountDataSourceImpl implements AccountDataSource {

    async findOneById(id: string): Promise<AccountEntity> {
        throw new Error("Method not implemented.");
    }
    async getMany(by: string, limit: number, offset: number): Promise<AccountEntity[]> {
        throw new Error("Method not implemented.");
    }
    async createAccount(dto: any): Promise<AccountEntity> {
        return dto;
    }
    async updateAccount(dto: any): Promise<AccountEntity> {
        throw new Error("Method not implemented.");
    }
    async changeStatusAccount(id: string): Promise<AccountEntity> {
        throw new Error("Method not implemented.");
    }
    async changePasswordAccount(oldPassword: string, newPassword: string, id: string): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
    async confirmPassword(password: string, id: string): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }

}