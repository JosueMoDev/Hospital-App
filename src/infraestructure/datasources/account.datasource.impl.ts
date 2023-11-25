import { Gender, Role } from "@prisma/client";
import { BcryptAdapter, DateFnsAdapter, prisma } from "../../config";
import {
  AccountDataSource,
  AccountEntity,
  CreateAccountDto,
  CustomError,
  PaginationDto,
  UpdateAccountDto,
  UpdatePasswordDto,
} from "../../domain";
const genderT = {
  male: Gender.MALE,
  female: Gender.FEMALE,
};
const roleT = {
  admin: Role.ADMIN,
  doctor: Role.DOCTOR,
  patient: Role.PATIENT,
};
export class AccountDataSourceImpl implements AccountDataSource {
  private async findAccountByEmail(email: string): Promise<void> {
    const emailExist = await prisma.account.findFirst({
      where: {
        email: email,
      },
    });
    if (emailExist) throw CustomError.badRequest("Email already exist");
  }

  async findOneById(id: string): Promise<AccountEntity> {
    const existAccount = await prisma.account.findFirst({
      where: {
        id: id,
      },
    });
    if (!existAccount) throw CustomError.badRequest("Any account was found");
    return AccountEntity.fromObject(existAccount);
  }

  async findMany(dto: PaginationDto): Promise<AccountEntity[]> {
    return dto as any;
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
        },
      });
      return AccountEntity.fromObject(saveAccount);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async updateAccount(dto: UpdateAccountDto): Promise<AccountEntity> {
    const { id, lastUpdate, isValidated, ...rest }: any = dto;

    if (Object.keys(rest).length === 0)  throw CustomError.badRequest("Nothing to update");
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
              account: lastUpdate.account,
              date: DateFnsAdapter.formatDate(),
              action: "UPDATE ACCOUNT",
            },
          ],
        },
      });
      return AccountEntity.fromObject(accountUpdated);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async changeStatusAccount(dto: UpdateAccountDto): Promise<AccountEntity> {
    const account = await this.findOneById(dto.id);
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
              ...dto.lastUpdate,
              date: DateFnsAdapter.formatDate(),
              action: "ACCOUNT VALIDATION",
            },
          ],
        },
      });
      return AccountEntity.fromObject(accountInvalidated);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async changePasswordAccount(dto: UpdatePasswordDto): Promise<Boolean> {
    const account = await this.findOneById(dto.id);
    try {
      const { newPassword, oldPassword } = dto;
      const hasMatch = BcryptAdapter.comparePassword(
        oldPassword,
        account.password
      );
      if (!hasMatch) throw CustomError.unauthorized("old password is wrong");
      const hashPassword = BcryptAdapter.hashPassword(newPassword);
      const accountInvalidated = await prisma.account.update({
        where: {
          id: account.id,
        },
        data: {
          password: hashPassword,
          lastUpdate: [
            ...account.lastUpdate,
            { ...dto.lastUpdate, date: new Date(), action: "CHANGE PASSWORD" },
          ],
        },
      });
      return accountInvalidated ? true : false;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async confirmPassword(password: string, id: string): Promise<Boolean> {
    return { password, id } as any;
  }
}
