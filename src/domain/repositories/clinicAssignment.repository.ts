import { ClinicAssignmentEntity, CreateClinicAssignmentDto } from "..";
export abstract class ClinicAssignmentRepository {
  abstract createAssignment(
    dto: CreateClinicAssignmentDto
  ): Promise<ClinicAssignmentEntity>;
  abstract updateAssignment(dto: any): Promise<ClinicAssignmentEntity>;
  abstract deleteAssignment(id: string): Promise<boolean>;
}
