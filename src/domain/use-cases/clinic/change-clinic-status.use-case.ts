import { UpdateClinicDto } from "../../dtos";
import { ClinicEntity } from "../../entities";
import { ClinicRepository } from "../../repositories";

interface ChangeClinicStatusUseCase {
  execute(updateClinicDto: UpdateClinicDto): Promise<ClinicEntity>;
}

export class ChangeClinicStatus implements ChangeClinicStatusUseCase {
  constructor(private readonly clinicRepository: ClinicRepository) {}
  async execute(updateClinicDto: UpdateClinicDto): Promise<ClinicEntity> {
    return this.clinicRepository.changeStatus(updateClinicDto);
  }
}
