import { ClinicDataSource, ClinicEntity, UpdateClinicDto, PaginationDto, CreateClinicDto } from "../../domain";

export class ClinicDataSourceImpl implements ClinicDataSource {

    async findOneById(id: string): Promise<ClinicEntity> {
        return id as any;
    }
    async findMany(dto: PaginationDto): Promise<ClinicEntity[]> {
        return dto as any
    }
    async create(dto: CreateClinicDto): Promise<ClinicEntity> {
        return dto as any;
    }
    async update(dto: UpdateClinicDto): Promise<ClinicEntity> {
        return dto as any;
    }
    async changeStatus(id: string): Promise<ClinicEntity> {
        return id as any;
    }

}