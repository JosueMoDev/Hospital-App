import { Gender, Role } from '@prisma/client';
import { UploadedFile } from 'express-fileupload';
import { FileDataSourceImpl } from '@infraestructure/datasourcesimpl';
import { FileRepositoryImpl } from '@infraestructure/repositoriesimpl';
import { AllowedFolder, prisma, DateFnsAdapter, BcryptAdapter } from '@config';
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
import { CustomError } from '@handler-errors';
const genderT = {
  male: Gender.MALE,
  female: Gender.FEMALE,
};
const roleT = {
  admin: Role.ADMIN,
  doctor: Role.DOCTOR,
  patient: Role.PATIENT,
};

const Folder: any = {
  ADMIN: AllowedFolder.admin,
  DOCTOR: 'doctors',
  PATIENT: 'patients',
};
export class AccountDataSourceImpl implements AccountDataSource {
  private readonly datasource = new FileDataSourceImpl();
  private readonly repository = new FileRepositoryImpl(this.datasource);

  async uploadFile(dto: UploadDto, file: UploadedFile): Promise<boolean> {
    const account = await this.findOneById(dto.id);
    if (!file) throw CustomError.badRequest('File no enviado');
    const { fileUrl, fileId } = await this.repository.uploadFile(
      dto,
      file,
      Folder[account.role],
    );
    const updateAccountPhoto = await prisma.account.update({
      where: { id: account.id },
      data: {
        photoId: fileId,
        photoUrl: fileUrl,
        lastUpdate: [
          ...account.lastUpdate,
          {
            updatedBy: dto.updatedBy,
            date: DateFnsAdapter.formatDate(),
            action: 'UPLOAD_FILE',
          },
        ],
      },
    });
    if (updateAccountPhoto) return true;
    return false;
  }
  async deleteFile(dto: UploadDto): Promise<boolean> {
    const account = await this.findOneById(dto.id);
    if (!account.photoUrl.length && !account.photoId.length)
      throw CustomError.notFound('that account not have any photo associeted');

    const { result } = await this.repository.deleteFile(account.photoId);
    if (result === 'not found')
      throw CustomError.internalServer('we couldnt delete photo');

    const accountUpdated = await prisma.account.update({
      where: { id: account.id },
      data: {
        photoId: '',
        photoUrl: '',
        lastUpdate: [
          ...account.lastUpdate,
          {
            updatedBy: dto.updatedBy,
            date: DateFnsAdapter.formatDate(),
            action: 'DELETE_FILE',
          },
        ],
      },
    });

    if (!accountUpdated) return false;
    return true;
  }
  private async findAccountByEmail(email: string): Promise<void> {
    const emailExist = await prisma.account.findFirst({
      where: {
        email: email,
      },
    });
    if (emailExist) throw CustomError.badRequest('Email already exist');
  }

  async findOneByDocument(documentNumber: string): Promise<AccountEntity> {
    const patientExist = await prisma.account.findFirst({
      where: {
        duiNumber: documentNumber,
      },
    });
    if (!patientExist)
      throw CustomError.badRequest('Any Patient found with document provided');
    if (Role[patientExist.role] !== Role.PATIENT)
      throw CustomError.badRequest('Account found dont belog to Patient');
    return AccountEntity.fromObject(patientExist);
  }

  async findOneById(id: string): Promise<AccountEntity> {
    const existAccount = await prisma.account.findFirst({
      where: {
        id: id,
      },
    });
    if (!existAccount) throw CustomError.badRequest('Any account was found');
    return AccountEntity.fromObject(existAccount);
  }

  async findMany(
    dto: PaginationDto,
  ): Promise<{ pagination: PaginationEntity; accounts: AccountEntity[] }> {
    const { page, pageSize } = dto;
    const [accounts, total] = await Promise.all([
      prisma.account.findMany({
        skip: PaginationEntity.dinamycOffset(page, pageSize),
        take: pageSize,
        where: {},
      }),
      prisma.account.count(),
    ]);

    const pagination = PaginationEntity.setPagination({ ...dto, total });
    const accountsMapped = accounts.map(AccountEntity.fromObject);
    return { pagination, accounts: accountsMapped };
  }

  async createAccount(dto: CreateAccountDto): Promise<AccountEntity> {
    await this.findAccountByEmail(dto.email);

    try {
      const hashPassword = BcryptAdapter.hashPassword(dto.password);
      const saveAccount = await prisma.account.create({
        data: {
          ...dto,
          password: hashPassword,
          gender: genderT[dto.gender],
          role: roleT[dto.role],
          createdAt: DateFnsAdapter.formatDate(),
          lastUpdate: [],
          isAssignable: roleT[dto.role] === 'DOCTOR' ? true : false,
        },
      });
      return AccountEntity.fromObject(saveAccount);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async updateAccount(dto: UpdateAccountDto): Promise<AccountEntity> {
    const { id, lastUpdate, isValidated, ...rest }: any = dto;
    if (Object.keys(rest).length === 0)
      throw CustomError.badRequest('Nothing to update');
    if (rest.role) rest.role = roleT[dto.role];
    if (rest.gender) rest.gender = genderT[dto.gender];

    const account = await this.findOneById(id);

    try {
      const accountUpdated = await prisma.account.update({
        where: { id: id },
        data: {
          ...rest,
          lastUpdate: [
            ...account.lastUpdate,
            {
              account: account.id,
              date: DateFnsAdapter.formatDate(),
              action: 'UPDATE ACCOUNT',
            },
          ],
        },
      });
      return AccountEntity.fromObject(accountUpdated);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async changeStatusAccount(id: string): Promise<boolean> {
    const account = await this.findOneById(id);
    try {
      const accountInvalidated = await prisma.account.update({
        where: {
          id: account.id,
        },
        data: {
          isValidated: !account.isValidated,
          lastUpdate: [
            ...account.lastUpdate,
            {
              updatedBy: account.id,
              date: DateFnsAdapter.formatDate(),
              action: 'STATUS_CHANGED',
            },
          ],
        },
      });

      return true;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async changePasswordAccount(dto: ChangePasswordDto): Promise<boolean> {
    const account = await this.findOneById(dto.account);
    try {
      const { newPassword, oldPassword } = dto;
      const hasMatch = BcryptAdapter.comparePassword(
        oldPassword,
        account.password,
      );
      if (!hasMatch) throw CustomError.unauthorized('old password is wrong');
      const hashPassword = BcryptAdapter.hashPassword(newPassword);
      const accountInvalidated = await prisma.account.update({
        where: {
          id: account.id,
        },
        data: {
          password: hashPassword,
          lastUpdate: [
            ...account.lastUpdate,
            {
              updatedBy: account.id,
              date: new Date(),
              action: 'UPDATE_PASSWORD',
            },
          ],
        },
      });
      return accountInvalidated ? true : false;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async confirmPassword(dto: ConfirmPasswordDto): Promise<boolean> {
    const account = await prisma.account.findFirst({ where: { id: dto.id } });
    if (!account) throw CustomError.badRequest('Any Account was found');
    return BcryptAdapter.comparePassword(dto.password, account.password);
  }
}
