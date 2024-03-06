import { UploadedFile } from "express-fileupload";
import { CreateAccountDto, PaginationDto, UpdateAccountDto, ConfirmPasswordDto, UpdatePasswordDto, UploadDto } from "../dtos";
import { AccountEntity, PaginationEntity } from "../entities";

export abstract class AccountRepository {

    abstract findOneById(id: string): Promise<AccountEntity>;

    abstract findMany(dto: PaginationDto): Promise<{ pagination: PaginationEntity, accounts: AccountEntity[] }>;

    abstract createAccount(dto: CreateAccountDto): Promise<AccountEntity>;

    abstract updateAccount(dto: UpdateAccountDto): Promise<AccountEntity>;

    abstract changeStatusAccount(dto: UpdateAccountDto): Promise<AccountEntity>;

    abstract changePasswordAccount(dto: UpdatePasswordDto): Promise<Boolean>;

    abstract confirmPassword(dto: ConfirmPasswordDto): Promise<Boolean>;

    abstract uploadPhoto(dto: UploadDto, file: UploadedFile): Promise<boolean>;

    abstract deletePhoto(dto: UploadDto): Promise<boolean>;
}