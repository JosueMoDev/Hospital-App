import { DateFnsAdapter, prisma } from "../../config";
import { ClinicDataSource, ClinicEntity, UpdateClinicDto, PaginationDto, CreateClinicDto, CustomError } from "../../domain";

export class ClinicDataSourceImpl implements ClinicDataSource {

    async findOneById(id: string): Promise<ClinicEntity> {
        const clinic = await prisma.clinic.findFirst({
            where: { id: id },
        });

        if (!clinic) throw CustomError.badRequest("Any clinic found");

        return ClinicEntity.fromObject(clinic);
    }

    async findMany(dto: PaginationDto): Promise<ClinicEntity[]> {
        return dto as any
    }

    async create(dto: CreateClinicDto): Promise<ClinicEntity> {
        try {
            const newClinic = await prisma.clinic.create({
                data: {
                    ...dto,
                    createdAt: DateFnsAdapter.formatDate(),
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
    async changeStatus(dto: UpdateClinicDto): Promise<ClinicEntity> {
        const clinic = await this.findOneById(dto.id);
        try {
            const clinicInvalidated = await prisma.clinic.update({
                where: {
                    id: clinic.id,
                },
                data: {
                    status: !clinic.stutus,
                    lastUpdate: [
                        ...clinic.lastUpdate,
                        {
                            ...dto.lastUpdate,
                            date: DateFnsAdapter.formatDate(),
                            action: "CHANGE CLINIC STATUS",
                        },
                    ],
                },
            });
            return ClinicEntity.fromObject(clinicInvalidated);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

}