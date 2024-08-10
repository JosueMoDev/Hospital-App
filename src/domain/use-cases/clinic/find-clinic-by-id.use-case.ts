import { ClinicEntity, ClinicRepository } from '../../../domain';

interface FindClinicByIdUseCase {
  execute(id: string): Promise<ClinicEntity>;
}

export class FindClinicById implements FindClinicByIdUseCase {
  constructor(private readonly clinicRepository: ClinicRepository) {}
  async execute(id: string): Promise<ClinicEntity> {
    return await this.clinicRepository.findOneById(id);
  }
}
