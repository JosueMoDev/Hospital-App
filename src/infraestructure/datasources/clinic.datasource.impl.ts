import { prisma } from "../../config";
import { ClinicDataSource, ClinicEntity, UpdateClinicDto, PaginationDto, CreateClinicDto, CustomError } from "../../domain";

export class ClinicDataSourceImpl implements ClinicDataSource {

    async findOneById(id: string): Promise<ClinicEntity> {
        return id as any;
    }
    async findMany(dto: PaginationDto): Promise<ClinicEntity[]> {
        return dto as any
    }
    async create(dto: CreateClinicDto): Promise<ClinicEntity> {
        try {
            const newClinic = await prisma.clinic.create({
                data: {
                    registerNumber: dto.registerNumber,
                    name: dto.name,
                    phone: dto.phone,
                    address: dto.address,
                    createdAt: new Date(),
                    status: true,
                    accountId: dto.createdBy,
                    photoURl: "",
                    photoId: ""
                }
            });
            return ClinicEntity.fromObject(newClinic);
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }
    async update(dto: UpdateClinicDto): Promise<ClinicEntity> {
        return dto as any;
    }
    async changeStatus(id: string): Promise<ClinicEntity> {
        return id as any;
    }

}