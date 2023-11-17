import { AccountEntity, AccountRepository, CreateAccountDto, UpdateAccountDto } from "../../domain";

export class AccountService {

    constructor(private readonly repository: AccountRepository) { }
    
    public async creatingAccount(dto: CreateAccountDto): Promise<AccountEntity> {
        return await this.repository.createAccount(dto);
    }
    public async updatingAccount(dto: UpdateAccountDto): Promise<AccountEntity> {
        return await this.repository.updateAccount(dto);
    }
    
}