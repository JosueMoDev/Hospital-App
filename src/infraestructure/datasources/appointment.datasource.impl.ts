import { AppointmentDataSource, AppointmentEntity, CreateAppointmentDto, PaginationDto, UpdateAppointmentDto } from "../../domain";

export class AppointmentDataSourceImpl implements AppointmentDataSource {

    async findOneById(id: string): Promise<AppointmentEntity> {
        return id as any;
    }
    async findMany(dto: PaginationDto): Promise<AppointmentEntity[]> {
        return dto as any;
    }
    async create(dto: CreateAppointmentDto): Promise<AppointmentEntity> {
        return dto as any;
    }
    async update(dto: UpdateAppointmentDto): Promise<AppointmentEntity> {
        return dto as any;
    }
    async delete(id: string): Promise<AppointmentEntity> {
        return id as any;
    }

}