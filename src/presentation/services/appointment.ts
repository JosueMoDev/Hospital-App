import { AppointmentEntity, AppointmentRepository, CreateAppointmentDto, UpdateAppointmentDto } from "../../domain";

export class AppointmentService {

    constructor(private readonly repository: AppointmentRepository) { }
    
    public async creatingAppointment(dto: CreateAppointmentDto): Promise<AppointmentEntity> {
        return await this.repository.create(dto);
    }

    public async updatingAppointment(dto: UpdateAppointmentDto): Promise<AppointmentEntity> {
        return await this.repository.update(dto);
    }
    
}