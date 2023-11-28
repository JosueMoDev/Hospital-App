import { DateFnsAdapter, Environment, prisma } from "../../config";
import { CreateRecordDto, CustomError, PaginationDto, PaginationEntity, RecordDataSource, RecordEntity, UpdateRecordDto } from "../../domain";

export class RecordDataSourceImpl implements RecordDataSource {

    async findOneById(id: string): Promise<RecordEntity> {
        const record = await prisma.record.findFirst({
            where: { id: id },
        });

        if (!record) throw CustomError.badRequest("Any record found");

        return RecordEntity.fromObject(record);
    }

    async findMany(dto: PaginationDto): Promise<{ pagination: PaginationEntity, records: RecordEntity[] }> {
        const { page: currentPage, pageSize } = dto;
        const [records, total] = await Promise.all([
            prisma.record.findMany({
                skip: (currentPage - 1) * pageSize,
                take: pageSize,
                where: {}
            }),
            prisma.record.count({ where: {} })
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
        const recordsMapped = records.map((record) => RecordEntity.fromObject(record));
        return { pagination, records: recordsMapped }
    }
    async create(dto: CreateRecordDto): Promise<RecordEntity> {
        try {
            const newRecord = await prisma.record.create({
                data: {
                    ...dto,
                    createdAt: DateFnsAdapter.formatDate(),
                }
            });
            return RecordEntity.fromObject(newRecord);
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }
    async uptate(dto: UpdateRecordDto): Promise<RecordEntity> {
        const { id, lastUpdate, ...rest } = dto;
        if (Object.keys(rest).length === 0) throw CustomError.badRequest("Nothing to update");
        const record = await this.findOneById(id);

        try {
            const recordUpdated = await prisma.record.update({
                where: { id: id },
                data: {
                    ...rest,
                    lastUpdate: [
                        ...record.lastUpdate,
                        {
                            account: lastUpdate.account,
                            date: DateFnsAdapter.formatDate(),
                            action: "UPDATE RECORD",
                        },
                    ],
                },
            });
            return RecordEntity.fromObject(recordUpdated);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
    async changeRecordStatus(dto: UpdateRecordDto): Promise<RecordEntity> {
        const record = await this.findOneById(dto.id);
        try {
            const statusChanged = await prisma.record.update({
                where: {
                    id: record.id,
                },
                data: {
                    status: !record.status,
                    lastUpdate: [
                        ...record.lastUpdate,
                        {
                            ...dto.lastUpdate,
                            date: DateFnsAdapter.formatDate(),
                            action: "CHANGE RECORD VISIBILITY",
                        },
                    ],
                },
            });
            return RecordEntity.fromObject(statusChanged);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

}