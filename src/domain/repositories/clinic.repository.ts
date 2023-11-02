import { ClinicEntity } from "../entities/clinic.entity";

export abstract class ClinicRepository {
   abstract findOneById(id: string): Promise<ClinicEntity>;
   abstract findMany(limit: string, offset: string): Promise<ClinicEntity[]>;
   abstract create(dto: any): Promise<ClinicEntity>;
   abstract update(dto: any): Promise<ClinicEntity>;
   abstract delete(id: string): Promise<ClinicEntity>;
}