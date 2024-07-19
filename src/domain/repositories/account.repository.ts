import { UploadedFile } from "express-fileupload";
import { CreateAccountDto, PaginationDto, UpdateAccountDto, ConfirmPasswordDto, ChangePasswordDto, UploadDto } from "../dtos";
import { AccountEntity, PaginationEntity } from "../entities";

export abstract class AccountRepository {

    abstract findOneById(id: string): Promise<AccountEntity>;

    abstract findOneByDocument(document: string): Promise<AccountEntity>;

    abstract findMany(dto: PaginationDto): Promise<{ pagination: PaginationEntity, accounts: AccountEntity[] }>;

    abstract createAccount(dto: CreateAccountDto): Promise<AccountEntity>;

    abstract updateAccount(dto: UpdateAccountDto): Promise<AccountEntity>;

    abstract changeStatusAccount(id: string): Promise<boolean>;

    abstract changePasswordAccount(dto: ChangePasswordDto): Promise<boolean>;

    abstract confirmPassword(dto: ConfirmPasswordDto): Promise<boolean>;

    abstract uploadPhoto(dto: UploadDto, file: UploadedFile): Promise<boolean>;

    abstract deletePhoto(dto: UploadDto): Promise<boolean>;
}