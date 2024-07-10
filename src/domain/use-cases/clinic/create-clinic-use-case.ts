import {
  ClinicEntity,
  ClinicRepository,
  CreateClinicDto,
} from "../../../domain";

interface CreateClinicUseCase {
  excute(createClinicDto: CreateClinicDto): Promise<ClinicEntity>;
}

export class CreateClinic implements CreateClinicUseCase {
  constructor(private readonly clinicRepository: ClinicRepository) {}

  async excute(createClinicDto: CreateClinicDto): Promise<ClinicEntity> {
    return await this.clinicRepository.create(createClinicDto);
  }
}
