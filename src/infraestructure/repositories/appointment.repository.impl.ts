import { AppointmentDataSource } from '@domain/datasources';
import {
  PaginationDto,
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from '@domain/dtos';
import { AppointmentEntity, PaginationEntity } from '@domain/entities';
import { AppointmentRepository } from '@domain/repositories';

export class AppointmentRepositoryImpl implements AppointmentRepository {
  constructor(private readonly datasource: AppointmentDataSource) {}

  findOneById(id: string): Promise<AppointmentEntity> {
    return this.datasource.findOneById(id);
  }
  findMany(dto: PaginationDto): Promise<{
    pagination: PaginationEntity;
    appointments: AppointmentEntity[];
  }> {
    return this.datasource.findMany(dto);
  }
  create(dto: CreateAppointmentDto): Promise<AppointmentEntity> {
    return this.datasource.create(dto);
  }
  update(dto: UpdateAppointmentDto): Promise<AppointmentEntity> {
    return this.datasource.update(dto);
  }
  delete(id: string): Promise<AppointmentEntity> {
    return this.datasource.delete(id);
  }
}
