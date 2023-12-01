import { UploadedFile } from "express-fileupload";
import { UpdateClinicDto, PaginationDto, CreateClinicDto, UploadDto } from "../dtos";
import { ClinicEntity, PaginationEntity } from "../entities";

export abstract class ClinicRepository {

   abstract findOneById(id: string): Promise<ClinicEntity>;

   abstract findMany(dto: PaginationDto): Promise<{ pagination: PaginationEntity, clinics: ClinicEntity[] }>;

   abstract create(dto: CreateClinicDto): Promise<ClinicEntity>;

   abstract update(dto: UpdateClinicDto): Promise<ClinicEntity>;

   abstract changeStatus(dto: UpdateClinicDto): Promise<ClinicEntity>;

   abstract uploadPhoto(dto: UploadDto, file: UploadedFile): Promise<boolean>;

   abstract deletePhoto(dto: UploadDto): Promise<boolean>;
}