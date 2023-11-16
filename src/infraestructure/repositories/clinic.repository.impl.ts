import { ClinicDataSource, ClinicEntity, ClinicRepository } from "../../domain";

export class ClinicRepositoyImpl implements ClinicRepository {

    constructor(private readonly datasource: ClinicDataSource){}

    findOneById(id: string): Promise<ClinicEntity> {
        return this.datasource.findOneById(id);
    }
    findMany(limit: string, offset: string): Promise<ClinicEntity[]> {
        return this.datasource.findMany(limit, offset);
    }
    create(dto: any): Promise<ClinicEntity> {
        return this.datasource.create(dto);
    }
    update(dto: any): Promise<ClinicEntity> {
        return this.datasource.update(dto);
    }
    delete(id: string): Promise<ClinicEntity> {
        return this.datasource.delete(id);
    }
    
}