import { ClinicEntity, ClinicRepository, CreateClinicDto, UpdateClinicDto } from "../../domain";

export class ClinicService {

    constructor(private readonly repository: ClinicRepository){}

    public async creatingClinic(dto: CreateClinicDto): Promise<ClinicEntity> {
        return await this.repository.create(dto);
    }

    public async updatingClinic(dto: UpdateClinicDto): Promise<ClinicEntity>{
        return await this.repository.update(dto);
    }
    
}