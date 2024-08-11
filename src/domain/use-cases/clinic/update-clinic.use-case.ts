import { UpdateClinicDto } from "@domain/dtos";
import { ClinicEntity } from "@domain/entities";
import { ClinicRepository } from "@domain/repositories";


interface UpdateClinicUseCase {
  excute(updateClinicDto: UpdateClinicDto): Promise<ClinicEntity>;
}

export class UpdateClinic implements UpdateClinicUseCase {
  constructor(private readonly clinicRepository: ClinicRepository) {}

  async excute(updateClinicDto: UpdateClinicDto): Promise<ClinicEntity> {
    return await this.clinicRepository.update(updateClinicDto);
  }
}
