import { AccountDataSource } from '@domain/datasources';
import {
  UploadDto,
  PaginationDto,
  CreateAccountDto,
  UpdateAccountDto,
  ChangePasswordDto,
  ConfirmPasswordDto,
} from '@domain/dtos';
import { AccountEntity, PaginationEntity } from '@domain/entities';
import { AccountRepository } from '@domain/repositories';
import { UploadedFile } from 'express-fileupload';

export class AccountRepositoryImpl implements AccountRepository {
  constructor(private readonly datasource: AccountDataSource) {}
  findOneByDocument(document: string): Promise<AccountEntity> {
    return this.datasource.findOneByDocument(document);
  }
  uploadFile(dto: UploadDto, file: UploadedFile): Promise<boolean> {
    return this.datasource.uploadFile(dto, file);
  }
  deleteFile(dto: UploadDto): Promise<boolean> {
    return this.datasource.deleteFile(dto);
  }

  findOneById(id: string): Promise<AccountEntity> {
    return this.datasource.findOneById(id);
  }

  findMany(
    dto: PaginationDto,
  ): Promise<{ pagination: PaginationEntity; accounts: AccountEntity[] }> {
    return this.datasource.findMany(dto);
  }

  createAccount(dto: CreateAccountDto): Promise<AccountEntity> {
    return this.datasource.createAccount(dto);
  }

  updateAccount(dto: UpdateAccountDto): Promise<AccountEntity> {
    return this.datasource.updateAccount(dto);
  }
  changeStatusAccount(id: string): Promise<boolean> {
    return this.datasource.changeStatusAccount(id);
  }

  changePasswordAccount(dto: ChangePasswordDto): Promise<boolean> {
    return this.datasource.changePasswordAccount(dto);
  }

  confirmPassword(dto: ConfirmPasswordDto): Promise<boolean> {
    return this.datasource.confirmPassword(dto);
  }
}
