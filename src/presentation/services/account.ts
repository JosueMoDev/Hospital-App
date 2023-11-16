import { AccountEntity, AccountRepository, CreateAccountDto } from "../../domain";

export class AccountService {

    constructor(private readonly repository: AccountRepository) { }
    
    public async creatingNewAccount(dto: CreateAccountDto): Promise<AccountEntity> {
        return await this.repository.createAccount(dto);
    }
    
}