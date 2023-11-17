import { ClinicEntity, ClinicRepository, CreateClinicDto } from "../../domain";

export class ClinicService {

    constructor(private readonly repository: ClinicRepository){}

    public async creatingClinic(dto: CreateClinicDto): Promise<ClinicEntity> {
        return await this.repository.create(dto);
    }
    
}