import { UpdateAppointmentDto } from "@domain/dtos";
import { AppointmentEntity } from "@domain/entities";
import { AppointmentRepository } from "@domain/repositories";


interface UpdateAppointmentUseCase {
  excute(
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<AppointmentEntity>;
}

export class UpdateAppoinment implements UpdateAppointmentUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}
  async excute(
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<AppointmentEntity> {
    return await this.appointmentRepository.update(updateAppointmentDto);
  }
}
