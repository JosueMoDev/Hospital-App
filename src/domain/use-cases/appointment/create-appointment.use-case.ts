import { AppointmentEntity, AppointmentRepository, CreateAppointmentDto } from "../../../domain";

interface CreateAppointmentUseCase {
  execute(createAppointmentDto: CreateAppointmentDto): Promise<AppointmentEntity>;
}

export class CreateAppointment implements CreateAppointmentUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(createAppointmentDto: CreateAppointmentDto): Promise<AppointmentEntity> {
    return await this.appointmentRepository.create(createAppointmentDto);
  }
}
