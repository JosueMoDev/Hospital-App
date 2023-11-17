import { AppointmentDataSource, AppointmentEntity, PaginationDto } from "../../domain";

export class AppointmentDataSourceImpl implements AppointmentDataSource {

    async findOneById(id: string): Promise<AppointmentEntity> {
        throw new Error("Method not implemented.");
    }
    async findMany(dto: PaginationDto): Promise<AppointmentEntity[]> {
        throw new Error("Method not implemented.");
    }
    async create(dto: any): Promise<AppointmentEntity> {
        return dto;
    }
    async update(dto: any): Promise<AppointmentEntity> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<AppointmentEntity> {
        throw new Error("Method not implemented.");
    }

}