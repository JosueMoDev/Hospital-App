import { ClinicDataSource, ClinicEntity, ClinicRepository, UpdateClinicDto, PaginationDto, CreateClinicDto } from "../../domain";

export class ClinicRepositoyImpl implements ClinicRepository {

    constructor(private readonly datasource: ClinicDataSource) { }

    findOneById(id: string): Promise<ClinicEntity> {
        return this.datasource.findOneById(id);
    }
    findMany(dto: PaginationDto): Promise<ClinicEntity[]> {
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