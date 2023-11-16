import { AppointmentDataSource, AppointmentEntity, AppointmentRepository } from "../../domain";

export class AppointmentRepositoryImpl implements AppointmentRepository {

    constructor( private readonly datasource: AppointmentDataSource ){}

    findOneById(id: string): Promise<AppointmentEntity> {
        return this.datasource.findOneById(id);
    }
    findMany(limit: number, offset: number): Promise<AppointmentEntity[]> {
        return this.datasource.findMany(limit, offset);
    }
    create(dto: any): Promise<AppointmentEntity> {
        return this.datasource.create(dto);
    }
    update(dto: any): Promise<AppointmentEntity> {
        return this.datasource.update(dto);
    }
    delete(id: string): Promise<AppointmentEntity> {
        return this.datasource.delete(id);
    }

}