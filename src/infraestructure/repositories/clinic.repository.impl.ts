import { UploadedFile } from 'express-fileupload';
import {
  ClinicDataSource,
  ClinicEntity,
  ClinicRepository,
  UpdateClinicDto,
  PaginationDto,
  CreateClinicDto,
  PaginationEntity,
  UploadDto,
} from '../../domain';

export class ClinicRepositoyImpl implements ClinicRepository {
  constructor(private readonly datasource: ClinicDataSource) {}

  uploadPhoto(dto: UploadDto, file: UploadedFile): Promise<any> {
    return this.datasource.uploadPhoto(dto, file);
  }
  deletePhoto(dto: any): Promise<any> {
    return this.datasource.deletePhoto(dto);
  }

  findOneById(id: string): Promise<ClinicEntity> {
    return this.datasource.findOneById(id);
  }
  findMany(
    dto: PaginationDto,
    sort?: string | undefined,
  ): Promise<{ pagination: PaginationEntity; clinics: ClinicEntity[] }> {
    return this.datasource.findMany(dto, sort);
  }
  create(dto: CreateClinicDto): Promise<ClinicEntity> {
    return this.datasource.create(dto);
  }
  update(dto: UpdateClinicDto): Promise<ClinicEntity> {
    return this.datasource.update(dto);
  }

  changeStatus(dto: UpdateClinicDto): Promise<boolean> {
    return this.datasource.changeStatus(dto);
  }
}
