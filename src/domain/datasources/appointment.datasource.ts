import { AppointmentEntity } from "../entities";

export abstract class  AppointmentDataSource {

   abstract findOneById(id: string): Promise<AppointmentEntity>;

   abstract findMany(limit: number, offset: number): Promise<AppointmentEntity[]>;

   abstract create(dto: any): Promise<AppointmentEntity>;

   abstract update(dto: any): Promise<AppointmentEntity>;

   abstract delete(id: string): Promise<AppointmentEntity>;



}