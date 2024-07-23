import {
  ClinicAssignmentDto,
  ClinicAssignmentRepository,
} from "../../../domain";

interface CreateClinicAssignmentUseCase {
  execute(assignmentDto: ClinicAssignmentDto): Promise<Boolean>;
}

export class CreateClinicAssignment implements CreateClinicAssignmentUseCase {
  constructor(
    private readonly clinicAssignmentRepository: ClinicAssignmentRepository
  ) {}

  async execute(assignmentDto: ClinicAssignmentDto): Promise<Boolean> {
    return await this.clinicAssignmentRepository.createAssignment(
      assignmentDto
    );
  }
}
