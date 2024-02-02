import { AccountEntity, ClinicAssignmentDto } from "..";
export abstract class ClinicAssignmentRepository {
  abstract getAssingnableDoctors(): Promise<AccountEntity[]>;

  abstract createAssignment(dto: ClinicAssignmentDto): Promise<boolean>;

  abstract updateAssignment(dto: any): Promise<boolean>;

  abstract deleteAssignment(id: string): Promise<boolean>;
}
