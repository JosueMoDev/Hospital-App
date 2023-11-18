import { UpdateAppointmentDto, PaginationDto, CreateAppointmentDto } from "../dtos";
import { AppointmentEntity } from "../entities";

export abstract class  AppointmentRepository {

   abstract findOneById(id: string): Promise<AppointmentEntity>;

   abstract findMany(dto: PaginationDto): Promise<AppointmentEntity[]>;

   abstract create(dto: CreateAppointmentDto): Promise<AppointmentEntity>;

   abstract update(dto: UpdateAppointmentDto): Promise<AppointmentEntity>;

   abstract delete(id: string): Promise<AppointmentEntity>;



}