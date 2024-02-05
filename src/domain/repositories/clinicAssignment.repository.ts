import { AccountEntity, ClinicAssignmentDto } from "..";
export abstract class ClinicAssignmentRepository {
  abstract getAssingnableDoctors(): Promise<AccountEntity[]>;

  abstract createAssignment(dto: ClinicAssignmentDto): Promise<boolean>;

  abstract updateAssignment(dto: ClinicAssignmentDto): Promise<boolean>;

  abstract deleteAssignment(dto: ClinicAssignmentDto): Promise<boolean>;
}
