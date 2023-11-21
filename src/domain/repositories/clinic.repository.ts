import { UpdateClinicDto, PaginationDto, CreateClinicDto } from "../dtos";
import { ClinicEntity } from "../entities";

export abstract class ClinicRepository {

   abstract findOneById(id: string): Promise<ClinicEntity>;

   abstract findMany(dto: PaginationDto): Promise<ClinicEntity[]>;

   abstract create(dto: CreateClinicDto): Promise<ClinicEntity>;

   abstract update(dto: UpdateClinicDto): Promise<ClinicEntity>;

   abstract changeStatus(id: string): Promise<ClinicEntity>;
}