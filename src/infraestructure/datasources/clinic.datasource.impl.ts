import { ClinicDataSource, ClinicEntity, CreateClinicDto, PaginationDto } from "../../domain";

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
    async update(dto: any): Promise<ClinicEntity> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<ClinicEntity> {
        throw new Error("Method not implemented.");
    }

}