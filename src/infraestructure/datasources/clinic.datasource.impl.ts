import { DateFnsAdapter, prisma } from "../../config";
import { ClinicDataSource, ClinicEntity, UpdateClinicDto, PaginationDto, CreateClinicDto, CustomError, PaginationEntity } from "../../domain";

export class ClinicDataSourceImpl implements ClinicDataSource {

    async findOneById(id: string): Promise<ClinicEntity> {
        const clinic = await prisma.clinic.findFirst({
            where: { id: id },
        });

        if (!clinic) throw CustomError.badRequest("Any clinic found");

        return ClinicEntity.fromObject(clinic);
    }

    async findMany(dto: PaginationDto): Promise<{ pagination: PaginationEntity, clinics: ClinicEntity[] }> {
        const { page: currentPage, pageSize } = dto;
        const [clinics, total] = await Promise.all([
            prisma.clinic.findMany({
                skip: (currentPage - 1) * pageSize,
                take: pageSize,
                where: {}
            }),
            prisma.clinic.count({ where: {} })
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
        const clinicsMapped = clinics.map(ClinicEntity.fromObject);
        return { pagination, clinics: clinicsMapped }
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
            throw CustomError.internalServer(`${error}`);
        }
    }
    async update(dto: UpdateClinicDto): Promise<ClinicEntity> {

        const { id, lastUpdate, ...rest } = dto;

        if (Object.keys(rest).length === 0) throw CustomError.badRequest("Nothing to update");

        const clinic = await this.findOneById(id);

        if (rest.address) rest.address = {
            ...clinic.address,
            ...rest.address
        }

        try {
            const clinicUpdated = await prisma.clinic.update({
                where: { id: id },
                data: {
                    ...rest,
                    lastUpdate: [
                        ...clinic.lastUpdate,
                        {
                            account: lastUpdate.account,
                            date: DateFnsAdapter.formatDate(),
                            action: "UPDATE CLINIC",
                        },
                    ],
                }
            });
            return ClinicEntity.fromObject(clinicUpdated);

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
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