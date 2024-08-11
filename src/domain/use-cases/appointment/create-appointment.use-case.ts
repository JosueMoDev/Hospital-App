import { CreateAppointmentDto } from "@domain/dtos";
import { AppointmentEntity } from "@domain/entities";
import { AppointmentRepository } from "@domain/repositories";


interface CreateAppointmentUseCase {
  execute(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<AppointmentEntity>;
}

export class CreateAppointment implements CreateAppointmentUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<AppointmentEntity> {
    return await this.appointmentRepository.create(createAppointmentDto);
  }
}
