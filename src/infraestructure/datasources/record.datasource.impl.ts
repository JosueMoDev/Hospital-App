import { prisma } from "../../config";
import { CreateRecordDto, CustomError, PaginationDto, RecordDataSource, RecordEntity, UpdateRecordDto } from "../../domain";

export class RecordDataSourceImpl implements RecordDataSource {

    async findOneById(id: string): Promise<RecordEntity> {
        return id as any
    }

    async findMany(dto: PaginationDto): Promise<RecordEntity[]> {
        return dto as any
    }
    async create(dto: CreateRecordDto): Promise<RecordEntity> {
        try {
            const newRecord = await prisma.record.create({
                data: {
                    createdAt: new Date(),
                    title: dto.title,
                    pdf: dto.body,
                    status: true,
                    doctorId: dto.doctor,
                    patientId: dto.patient
                }
            });
            return RecordEntity.fromObject(newRecord);
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }
    async uptate(dto: UpdateRecordDto): Promise<RecordEntity> {
        return dto as any;
    }
    async hiddeRecords(id: string): Promise<Boolean> {
        return id as any
    }

}