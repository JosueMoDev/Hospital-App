import { AppointmentDataSource, AppointmentEntity, CreateAppointmentDto, PaginationDto, UpdateAppointmentDto } from "../../domain";

export class AppointmentDataSourceImpl implements AppointmentDataSource {

    async findOneById(id: string): Promise<AppointmentEntity> {
        throw new Error("Method not implemented.");
    }
    async findMany(dto: PaginationDto): Promise<AppointmentEntity[]> {
        throw new Error("Method not implemented.");
    }
    async create(dto: CreateAppointmentDto): Promise<AppointmentEntity> {
        return await dto as any;
    }
    async update(dto: UpdateAppointmentDto ): Promise<AppointmentEntity> {
        return await dto as any;
    }
    async delete(id: string): Promise<AppointmentEntity> {
        throw new Error("Method not implemented.");
    }

}