import { PaginationDto } from "@domain/dtos";
import { PaginationEntity, AppointmentEntity } from "@domain/entities";
import { AppointmentRepository } from "@domain/repositories";


interface FindManyAppointmentsUseCase {
  execute(dto: PaginationDto): Promise<{
    pagination: PaginationEntity;
    appointments: AppointmentEntity[];
  }>;
}

export class FindManyAppointments implements FindManyAppointmentsUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}
  async execute(paginationDto: PaginationDto): Promise<{
    pagination: PaginationEntity;
    appointments: AppointmentEntity[];
  }> {
    return await this.appointmentRepository.findMany(paginationDto);
  }
}
