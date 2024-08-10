import {
  PaginationDto,
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from '@domain/dtos';
import { AppointmentEntity, PaginationEntity } from '@domain/entities';

export abstract class AppointmentDataSource {
  abstract findOneById(id: string): Promise<AppointmentEntity>;

  abstract findMany(dto: PaginationDto): Promise<{
    pagination: PaginationEntity;
    appointments: AppointmentEntity[];
  }>;

  abstract create(dto: CreateAppointmentDto): Promise<AppointmentEntity>;

  abstract update(dto: UpdateAppointmentDto): Promise<AppointmentEntity>;

  abstract delete(id: string): Promise<AppointmentEntity>;
}
