import { AccountEntity } from "./account.entity";
import { ClinicEntity } from "./clinic.entity";

export interface ClinicAssignmentOptions {
  id: string;
  clinic: ClinicEntity;
  doctors: AccountEntity[];
}

export class ClinicAssignmentEntity {
  public id: string;
  public clinic: ClinicEntity;
  public doctors: AccountEntity[];

  constructor(options: ClinicAssignmentOptions) {
    const { clinic, doctors, id } = options;
    this.id = id;
    this.clinic = clinic;
    this.doctors = doctors;
  }

  static fromObject(object: { [key: string]: any }): ClinicAssignmentEntity {
    const { id, clinic, doctors } = object;

    const clinicAssignment = new ClinicAssignmentEntity({
      id,
      clinic,
      doctors,
    });
    return clinicAssignment;
  }
}
