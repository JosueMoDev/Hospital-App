import { Gender, Role } from "@prisma/client";
import { BcryptAdapter, prisma } from "../../config";
import { AccountDataSource, AccountEntity, CreateAccountDto, CustomError, PaginationDto, UpdatePasswordDto } from "../../domain";

export class AccountDataSourceImpl implements AccountDataSource {

    async findOneById(id: string): Promise<AccountEntity> {
        const existAccount = await prisma.account.findFirst({
            where: {
                id: id
            }
        });
        if (!existAccount) throw CustomError.badRequest('Account already exist');
        return AccountEntity.fromObject(existAccount);
    }
    async findMany(dto: PaginationDto): Promise<AccountEntity[]> {
        return dto as any;
    }
    async createAccount(dto: CreateAccountDto): Promise<AccountEntity> {
        const gender = {
            male: Gender.MALE,
            female: Gender.FEMALE
        }
        const role = {
            admin: Role.ADMIN,
            doctor: Role.DOCTOR,
            patient: Role.PATIENT
        }
        const emailExist = await prisma.account.findFirst({
            where: {
                email: dto.email
            }
        });
        if (emailExist) throw CustomError.badRequest('Email already exist');

        try {
            const hashPassword = BcryptAdapter.hashPassword(dto.password);
            const saveAccount = await prisma.account.create({
                data: {
                    ...dto,
                    password: hashPassword,
                    gender: gender[dto.gender],
                    isValidated: false,
                    role: role[dto.role],
                    createdAt: new Date(),
                    photoUrl: '',
                    photoId: ''
                }
            });
            return AccountEntity.fromObject(saveAccount);
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }
    async updateAccount(dto: any): Promise<AccountEntity> {
        return dto as AccountEntity;
    }
    async changeStatusAccount(id: string): Promise<AccountEntity> {
        return id as any;
    }
    async changePasswordAccount(dto: UpdatePasswordDto): Promise<Boolean> {
        return dto as any;
    }
    async confirmPassword(password: string, id: string): Promise<Boolean> {
        return { password, id } as any;
    }

}