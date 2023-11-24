import { ClinicEntity, ClinicRepository, CreateClinicDto, PaginationDto, UpdateClinicDto } from "../../domain";

export class ClinicService {

    constructor(private readonly repository: ClinicRepository) { }

    public async creatingClinic(dto: CreateClinicDto): Promise<ClinicEntity> {
        return await this.repository.create(dto);
    }

    public async updatingClinic(dto: UpdateClinicDto): Promise<ClinicEntity> {
        return await this.repository.update(dto);
    }

    public async findingOneById(id: string): Promise<ClinicEntity> {
        return await this.repository.findOneById(id);
    }

    public async findingMany(dto: PaginationDto): Promise<ClinicEntity[]> {
        return await this.repository.findMany(dto);
    }

    public async changingStatus(dto: UpdateClinicDto): Promise<ClinicEntity> {
        return await this.repository.changeStatus(dto);
    }

}