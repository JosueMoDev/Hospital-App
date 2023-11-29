import { ClinicDataSource, ClinicEntity, ClinicRepository, UpdateClinicDto, PaginationDto, CreateClinicDto, PaginationEntity } from "../../domain";

export class ClinicRepositoyImpl implements ClinicRepository {

    constructor(private readonly datasource: ClinicDataSource) { }

    uploadPhoto(dto: any): Promise<any> {
        return this.datasource.uploadPhoto(dto);
    }
    deletePhoto(dto: any): Promise<any> {
        return this.datasource.deletePhoto(dto);
    }

    findOneById(id: string): Promise<ClinicEntity> {
        return this.datasource.findOneById(id);
    }
    findMany(dto: PaginationDto): Promise<{ pagination: PaginationEntity, clinics: ClinicEntity[] }> {
        return this.datasource.findMany(dto);
    }
    create(dto: CreateClinicDto): Promise<ClinicEntity> {
        return this.datasource.create(dto);
    }
    update(dto: UpdateClinicDto): Promise<ClinicEntity> {
        return this.datasource.update(dto);
    }
  
    changeStatus(dto: UpdateClinicDto): Promise<ClinicEntity> {
        return this.datasource.changeStatus(dto);
    }

}