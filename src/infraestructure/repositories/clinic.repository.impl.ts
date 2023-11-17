import { ClinicDataSource, ClinicEntity, ClinicRepository, CreateClinicDto, PaginationDto } from "../../domain";

export class ClinicRepositoyImpl implements ClinicRepository {

    constructor(private readonly datasource: ClinicDataSource){}

    findOneById(id: string): Promise<ClinicEntity> {
        return this.datasource.findOneById(id);
    }
    findMany(dto: PaginationDto): Promise<ClinicEntity[]> {
        return this.datasource.findMany(dto);
    }
    create(dto: CreateClinicDto): Promise<ClinicEntity> {
        return this.datasource.create(dto);
    }
    update(dto: any): Promise<ClinicEntity> {
        return this.datasource.update(dto);
    }
    delete(id: string): Promise<ClinicEntity> {
        return this.datasource.delete(id);
    }
    
}