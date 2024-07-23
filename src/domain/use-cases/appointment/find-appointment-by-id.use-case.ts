import { AppointmentEntity, AppointmentRepository} from "../../../domain";

interface FindAppointmentByIdUseCase {
    execute(id: string): Promise<AppointmentEntity>
}

export class FindAppointmentById implements FindAppointmentByIdUseCase {
    constructor(private readonly appointmentRepository: AppointmentRepository){}
    async execute(id: string): Promise<AppointmentEntity> {
        return await this.appointmentRepository.findOneById(id);
    }
}