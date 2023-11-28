import { AppointmentEntity, AppointmentRepository, CreateAppointmentDto, PaginationDto, PaginationEntity, UpdateAppointmentDto } from "../../domain";

export class AppointmentService {

    constructor(private readonly repository: AppointmentRepository) { }

    public async findingAppointmentById(id: string): Promise<AppointmentEntity> {
        return await this.repository.findOneById(id);
    }

    public async findingManyAppointments(dto: PaginationDto): Promise<{ pagination: PaginationEntity, appointments: AppointmentEntity[] }> {
        return await this.repository.findMany(dto);
    }

    public async creatingAppointment(dto: CreateAppointmentDto): Promise<AppointmentEntity> {
        return await this.repository.create(dto);
    }

    public async updatingAppointment(dto: UpdateAppointmentDto): Promise<AppointmentEntity> {
        return await this.repository.update(dto);
    }

    public async deletingAppointment(id: string): Promise<AppointmentEntity> {
        return await this.repository.delete(id);
    }

}