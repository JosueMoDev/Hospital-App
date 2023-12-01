import { Gender, Role } from "@prisma/client";
import { AllowedFolder, BcryptAdapter, DateFnsAdapter, prisma } from "../../config";
import {
    AccountDataSource,
    AccountEntity,
    CreateAccountDto,
    CustomError,
    PaginationDto,
    UpdateAccountDto,
    ConfirmPasswordDto,
    UpdatePasswordDto,
    PaginationEntity,
    UploadDto,
} from "../../domain";
import { UploadedFile } from "express-fileupload";
import { FileDataSourceImpl } from "./file.datasource.impl";
import { FileRepositoryImpl } from "../repositories";
import { FileService } from "../../presentation";
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
    DOCTOR: "doctors",
    PATIENT: "patients",
};
export class AccountDataSourceImpl implements AccountDataSource {
    private readonly datasource = new FileDataSourceImpl();
    private readonly repository = new FileRepositoryImpl(this.datasource);
    private readonly fileservice = new FileService(this.repository);

    async uploadPhoto(dto: UploadDto, file: UploadedFile): Promise<boolean> {
        const { id, lastUpdate } = dto;
        const account = await this.findOneById(id);
        if (!file) throw CustomError.badRequest("File no enviado");
        const { fileUrl, fileId } = await this.fileservice.uploadingFile({
            file: {
                ...file,
                name: account.id
            },
            args: {
                folder: Folder[account.role],
                public_id: account.id
            }
        });
        const updateAccountPhoto = await prisma.account.update({
            where: { id: id },
            data: {
                photoId: fileId,
                photoUrl: fileUrl,
                lastUpdate: [...account.lastUpdate],
            },
        });
        if (updateAccountPhoto) return true;
        return false;
    }
    async deletePhoto(dto: UploadDto): Promise<boolean> {
        const account = await this.findOneById(dto.id);
        if (!account.photoUrl.length && !account.photoId.length) throw CustomError.notFound('that account not have any photo associeted');

        const { result } = await this.fileservice.deletingFile(account.photoId);
        if (result === 'not found') throw CustomError.internalServer('we couldnt delete photo');
        const accountUpdated = await prisma.account.update({
            where: { id: dto.id },
            data: {
                photoId: '',
                photoUrl: '',
                lastUpdate: [...account.lastUpdate, {
                    account: dto.lastUpdate.account,
                    date: DateFnsAdapter.formatDate(),
                    action: "UPDATE ACCOUNT",
                },]
            }
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

    async findMany(dto: PaginationDto): Promise<{ pagination: PaginationEntity, accounts: AccountEntity[] }> {
        const { page: currentPage, pageSize } = dto;
        const [accounts, total] = await Promise.all([
            prisma.account.findMany({
                skip: (currentPage - 1) * pageSize,
                take: pageSize,
                where: {}
            }),
            prisma.account.count({ where: {} })
        ]);
        const totalPages = Math.ceil(total / pageSize);

        const nextPage = (currentPage < totalPages)
            ? `/api/record/find-many?page=${currentPage + 1}&pageSize=${pageSize}`
            : null;

        const previousPage = (currentPage > 1)
            ? `/api/record/find-many?page=${currentPage - 1}&pageSize=${pageSize}`
            : null;

        const pagination = PaginationEntity.pagination({
            currentPage,
            total,
            pageSize,
            nextPage,
            previousPage
        });
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
                },
            });
            return AccountEntity.fromObject(saveAccount);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async updateAccount(dto: UpdateAccountDto): Promise<AccountEntity> {
        const { id, lastUpdate, isValidated, ...rest }: any = dto;

        if (Object.keys(rest).length === 0) throw CustomError.badRequest("Nothing to update");
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

    async confirmPassword(dto: ConfirmPasswordDto): Promise<Boolean> {
        const account = await prisma.account.findFirst({ where: { id: dto.id } });
        if (!account) throw CustomError.badRequest('Any Account was found');
        return BcryptAdapter.comparePassword(dto.password, account.password);
    }
}
