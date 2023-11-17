import { ClinicDataSource, ClinicEntity } from "../../domain";

export class ClinicDataSourceImpl implements ClinicDataSource {

    async findOneById(id: string): Promise<ClinicEntity> {
        throw new Error("Method not implemented.");
    }
    async findMany(limit: string, offset: string): Promise<ClinicEntity[]> {
        throw new Error("Method not implemented.");
    }
    async create(dto: any): Promise<ClinicEntity> {
        return dto;
    }
    async update(dto: any): Promise<ClinicEntity> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<ClinicEntity> {
        throw new Error("Method not implemented.");
    }

}