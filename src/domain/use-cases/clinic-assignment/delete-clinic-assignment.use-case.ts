import { ClinicAssignmentDto } from "@domain/dtos";
import { ClinicAssignmentRepository } from "@domain/repositories";

interface DeleteClinicAssignmentUseCase {
  execute(assignmentDto: ClinicAssignmentDto): Promise<Boolean>;
}

export class DeleteClinicAssignment implements DeleteClinicAssignmentUseCase {
  constructor(
    private readonly clinicAssignmentRepository: ClinicAssignmentRepository,
  ) {}

  async execute(assignmentDto: ClinicAssignmentDto): Promise<Boolean> {
    return await this.clinicAssignmentRepository.deleteAssignment(
      assignmentDto,
    );
  }
}
