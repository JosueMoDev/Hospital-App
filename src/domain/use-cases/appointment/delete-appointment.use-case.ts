import { AppointmentEntity } from "@domain/entities";
import { AppointmentRepository } from "@domain/repositories";

interface DeleteAppointmentByIdUseCase {
  execute(id: string): Promise<AppointmentEntity>;
}

export class DeleteAppointmentById implements DeleteAppointmentByIdUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}
  async execute(id: string): Promise<AppointmentEntity> {
    return await this.appointmentRepository.delete(id);
  }
}
