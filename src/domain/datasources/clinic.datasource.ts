import {
  PaginationDto,
  CreateClinicDto,
  UpdateClinicDto,
  UploadDto,
} from '@domain/dtos';
import { ClinicEntity, PaginationEntity } from '@domain/entities';
import { UploadedFile } from 'express-fileupload';

export abstract class ClinicDataSource {
  abstract findOneById(id: string): Promise<ClinicEntity>;

  abstract findMany(
    dto: PaginationDto,
    sort?: string | undefined,
  ): Promise<{ pagination: PaginationEntity; clinics: ClinicEntity[] }>;

  abstract create(dto: CreateClinicDto): Promise<ClinicEntity>;

  abstract update(dto: UpdateClinicDto): Promise<ClinicEntity>;

  abstract changeStatus(dto: UpdateClinicDto): Promise<boolean>;

  abstract uploadPhoto(dto: UploadDto, file: UploadedFile): Promise<boolean>;

  abstract deletePhoto(dto: UploadDto): Promise<boolean>;
}
