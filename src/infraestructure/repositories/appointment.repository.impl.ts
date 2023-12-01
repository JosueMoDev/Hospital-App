import {
  AppointmentDataSource,
  AppointmentEntity,
  AppointmentRepository,
  UpdateAppointmentDto,
  PaginationDto,
  CreateAppointmentDto,
  PaginationEntity,
} from "../../domain";

export class AppointmentRepositoryImpl implements AppointmentRepository {
  constructor(private readonly datasource: AppointmentDataSource) { }

  findOneById(id: string): Promise<AppointmentEntity> {
    return this.datasource.findOneById(id);
  }
  findMany(dto: PaginationDto): Promise<{ pagination: PaginationEntity, appointments: AppointmentEntity[] }> {
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
