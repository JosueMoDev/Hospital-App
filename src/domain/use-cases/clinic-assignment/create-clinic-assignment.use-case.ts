import { ClinicAssignmentDto } from "@domain/dtos";
import { ClinicAssignmentRepository } from "@domain/repositories";


interface CreateClinicAssignmentUseCase {
  execute(assignmentDto: ClinicAssignmentDto): Promise<Boolean>;
}

export class CreateClinicAssignment implements CreateClinicAssignmentUseCase {
  constructor(
    private readonly clinicAssignmentRepository: ClinicAssignmentRepository,
  ) {}

  async execute(assignmentDto: ClinicAssignmentDto): Promise<Boolean> {
    return await this.clinicAssignmentRepository.createAssignment(
      assignmentDto,
    );
  }
}
