import {
    ClinicAssignmentDto,
  ClinicAssignmentRepository,
} from "../../../domain";

interface UpdateClinicAssignmentUseCase {
  execute(assignmentDto: ClinicAssignmentDto): Promise<Boolean>;
}

export class UpdateClinicAssignment implements UpdateClinicAssignmentUseCase {
  constructor(
    private readonly clinicAssignmentRepository: ClinicAssignmentRepository
  ) {}

  async execute(assignmentDto:ClinicAssignmentDto ): Promise<Boolean> {
    return await this.clinicAssignmentRepository.updateAssignment(
      assignmentDto
    );
  }
}
