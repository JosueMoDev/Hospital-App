import { AccountEntity } from "@domain/entities";
import { ClinicAssignmentRepository } from "@domain/repositories";


interface GetAssignableDoctorsUseCase {
  excute(): Promise<AccountEntity[]>;
}

export class GetAssignableDoctors implements GetAssignableDoctorsUseCase {
  constructor(
    private readonly clinicAssignmentRepository: ClinicAssignmentRepository,
  ) {}

  async excute(): Promise<AccountEntity[]> {
    return await this.clinicAssignmentRepository.getAssingnableDoctors();
  }
}
