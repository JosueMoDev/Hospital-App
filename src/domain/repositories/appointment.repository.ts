import { AppointmentEntity } from "../entities/appointment.entity";

export abstract class  AppointmentRepository {

   abstract findOneById(id: string): Promise<AppointmentEntity>;

   abstract findMany(limit: number, offset: number): Promise<AppointmentEntity[]>;

   abstract create(dto: any): Promise<AppointmentEntity>;

   abstract update(dto: any): Promise<AppointmentEntity>;

   abstract delete(id: string): Promise<AppointmentEntity>;



}