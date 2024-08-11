import { ClinicAssignmentDto } from "@domain/dtos";
import { ClinicAssignmentRepository } from "@domain/repositories";


interface UpdateClinicAssignmentUseCase {
  execute(assignmentDto: ClinicAssignmentDto): Promise<Boolean>;
}

export class UpdateClinicAssignment implements UpdateClinicAssignmentUseCase {
  constructor(
    private readonly clinicAssignmentRepository: ClinicAssignmentRepository,
  ) {}

  async execute(assignmentDto: ClinicAssignmentDto): Promise<Boolean> {
    return await this.clinicAssignmentRepository.updateAssignment(
      assignmentDto,
    );
  }
}
