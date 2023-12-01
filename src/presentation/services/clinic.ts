import { UploadedFile } from "express-fileupload";
import { ClinicEntity, ClinicRepository, CreateClinicDto, PaginationDto, PaginationEntity, UpdateClinicDto, UploadDto } from "../../domain";

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


    public async findingMany(dto: PaginationDto): Promise<{ pagination: PaginationEntity, clinics: ClinicEntity[] }> {
        return await this.repository.findMany(dto);
    }

    public async changingStatus(dto: UpdateClinicDto): Promise<ClinicEntity> {
        return await this.repository.changeStatus(dto);
    }


    public async uploadingPhoto(dto: UploadDto, file: UploadedFile): Promise<boolean> {
        return await this.repository.uploadPhoto(dto, file)
    }

    public async deletingPhoto(dto: UploadDto): Promise<boolean> {
        return await this.repository.deletePhoto(dto);
    }

}