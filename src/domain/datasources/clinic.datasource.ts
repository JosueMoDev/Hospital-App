import { ClinicEntity } from "../entities";

export abstract class ClinicDataSource {

   abstract findOneById(id: string): Promise<ClinicEntity>;

   abstract findMany(limit: string, offset: string): Promise<ClinicEntity[]>;

   abstract create(dto: any): Promise<ClinicEntity>;

   abstract update(dto: any): Promise<ClinicEntity>;

   abstract delete(id: string): Promise<ClinicEntity>;
   
}