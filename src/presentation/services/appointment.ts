import { AppointmentEntity, AppointmentRepository, createAppointmentDto } from "../../domain";

export class AppointmentService {

    constructor(private readonly repository: AppointmentRepository) { }
    
    public async creatingAppointment(dto: createAppointmentDto): Promise<AppointmentEntity> {
        return await this.repository.create(dto);
    }
    
}