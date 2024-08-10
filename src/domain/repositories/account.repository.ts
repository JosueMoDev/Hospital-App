import {
  PaginationDto,
  CreateAccountDto,
  UpdateAccountDto,
  ChangePasswordDto,
  ConfirmPasswordDto,
  UploadDto,
} from '@domain/dtos';
import { AccountEntity, PaginationEntity } from '@domain/entities';
import { UploadedFile } from 'express-fileupload';

export abstract class AccountRepository {
  abstract findOneById(id: string): Promise<AccountEntity>;

  abstract findOneByDocument(document: string): Promise<AccountEntity>;

  abstract findMany(
    dto: PaginationDto,
  ): Promise<{ pagination: PaginationEntity; accounts: AccountEntity[] }>;

  abstract createAccount(dto: CreateAccountDto): Promise<AccountEntity>;

  abstract updateAccount(dto: UpdateAccountDto): Promise<AccountEntity>;

  abstract changeStatusAccount(id: string): Promise<boolean>;

  abstract changePasswordAccount(dto: ChangePasswordDto): Promise<boolean>;

  abstract confirmPassword(dto: ConfirmPasswordDto): Promise<boolean>;

  abstract uploadFile(dto: UploadDto, file: UploadedFile): Promise<boolean>;

  abstract deleteFile(dto: UploadDto): Promise<boolean>;
}
