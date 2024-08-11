import { AppointmentEntity } from "@domain/entities";
import { AppointmentRepository } from "@domain/repositories";

interface FindAppointmentByIdUseCase {
  execute(id: string): Promise<AppointmentEntity>;
}

export class FindAppointmentById implements FindAppointmentByIdUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}
  async execute(id: string): Promise<AppointmentEntity> {
    return await this.appointmentRepository.findOneById(id);
  }
}
