import { AccountEntity, ClinicAssignmentEntity, CreateClinicAssignmentDto } from "..";
export abstract class ClinicAssignmentRepository {
  abstract getAssingnableDoctors(): Promise<AccountEntity[]>;

  abstract createAssignment(dto: CreateClinicAssignmentDto): Promise<ClinicAssignmentEntity>;

  abstract updateAssignment(dto: any): Promise<ClinicAssignmentEntity>;

  abstract deleteAssignment(id: string): Promise<boolean>;
}
