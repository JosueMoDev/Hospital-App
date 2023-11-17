import { CreateAppointmentDto, PaginationDto } from "../dtos";
import { AppointmentEntity } from "../entities";

export abstract class  AppointmentDataSource {

   abstract findOneById(id: string): Promise<AppointmentEntity>;

   abstract findMany(dto: PaginationDto): Promise<AppointmentEntity[]>;

   abstract create(dto: CreateAppointmentDto): Promise<AppointmentEntity>;

   abstract update(dto: any): Promise<AppointmentEntity>;

   abstract delete(id: string): Promise<AppointmentEntity>;



}