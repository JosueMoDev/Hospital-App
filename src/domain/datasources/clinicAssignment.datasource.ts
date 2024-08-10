import { ClinicAssignmentDto } from "@domain/dtos";
import { AccountEntity } from "@domain/entities";

export abstract class CLinicAssignmentDataSource {
  abstract getAssingnableDoctors(): Promise<AccountEntity[]>;

  abstract getAssignedDoctors(id: string): Promise<AccountEntity[]>;

  abstract createAssignment(dto: ClinicAssignmentDto): Promise<boolean>;

  abstract updateAssignment(dto: ClinicAssignmentDto): Promise<boolean>;

  abstract deleteAssignment(dto: ClinicAssignmentDto): Promise<boolean>;
}
