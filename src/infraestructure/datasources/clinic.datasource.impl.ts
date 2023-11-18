import { ClinicDataSource, ClinicEntity, UpdateClinicDto, PaginationDto, CreateClinicDto } from "../../domain";

export class ClinicDataSourceImpl implements ClinicDataSource {

    async findOneById(id: string): Promise<ClinicEntity> {
        throw new Error("Method not implemented.");
    }
    async findMany(dto: PaginationDto): Promise<ClinicEntity[]> {
        throw new Error("Method not implemented.");
    }
    async create(dto: CreateClinicDto): Promise<ClinicEntity> {
        return dto as any;
    }
    async update(dto: UpdateClinicDto): Promise<ClinicEntity> {
        return dto as any;
    }
    async delete(id: string): Promise<ClinicEntity> {
        throw new Error("Method not implemented.");
    }

}