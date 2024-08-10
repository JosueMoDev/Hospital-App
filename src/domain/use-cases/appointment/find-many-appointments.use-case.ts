import {
  AppointmentEntity,
  AppointmentRepository,
  PaginationDto,
  PaginationEntity,
} from '../../../domain';

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
