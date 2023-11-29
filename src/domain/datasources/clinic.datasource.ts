import { UpdateClinicDto, PaginationDto, CreateClinicDto } from "../dtos";
import { ClinicEntity, PaginationEntity } from "../entities";

export abstract class ClinicDataSource {

   abstract findOneById(id: string): Promise<ClinicEntity>;

   abstract findMany(dto: PaginationDto): Promise<{ pagination: PaginationEntity, clinics: ClinicEntity[] }>;

   abstract create(dto: CreateClinicDto): Promise<ClinicEntity>;

   abstract update(dto: UpdateClinicDto): Promise<ClinicEntity>;

   abstract changeStatus(dto: UpdateClinicDto): Promise<ClinicEntity>;

   abstract uploadPhoto(dto: any): Promise<any>;

   abstract deletePhoto(dto:any): Promise<any>;

}