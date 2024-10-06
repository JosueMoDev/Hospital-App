import { LastUpdate } from '@prisma/client';
import { AccountEntity, ClinicEntity } from '@domain/entities';


type Account = Partial<
  Pick<
    AccountEntity,
    'id' | 'duiNumber' | 'name' | 'lastname' | 'email' | 'photoUrl' | 'phone' | 'role'
  >
>;
type Clinic = Partial<
  Pick<ClinicEntity, 'id' | 'name' | 'address' | 'phone' | 'photoUrl'>
>;
export interface AppointmentEntityOptions {
  id: string;
  startDate: Date;
  endDate: Date;
  doctor: Account;
  patient: Account;
  clinic: Clinic;
  createdAt: Date;
  createdBy: string;
  lastUpdate: LastUpdate[];
}

export class AppointmentEntity {
  public id: string;
  public startDate: Date;
  public endDate: Date;
  public doctor: Account;
  public patient: Account;
  public clinic: Clinic;
  public createdAt: Date;
  public createdBy: string;
  public lastUpdate: LastUpdate[];

  constructor(options: AppointmentEntityOptions) {
    const {
      id,
      startDate,
      endDate,
      doctor,
      patient,
      clinic,
      createdAt,
      createdBy,
      lastUpdate,
    } = options;

    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.doctor = doctor;
    this.patient = patient;
    this.clinic = clinic;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.lastUpdate = lastUpdate;
  }

  static accountMapper(object: { [key: string]: any }): Account {
    const { id, duiNumber, name, lastname, phone, photoUrl, email, role } = object;
    return { id, duiNumber, name, lastname, phone, photoUrl, email, role };
  }

  static clinicMapper(object: { [key: string]: any }): Clinic {
    const { id, name, address, phone, photoUrl } = object;
    return { id, name, address, phone, photoUrl };
  }

  static fromObject(object: { [key: string]: any }): AppointmentEntity {
    const {
      id,
      startDate,
      endDate,
      doctor,
      patient,
      clinic,
      createdAt,
      createdBy,
      lastUpdate,
    } = object;
    const appointment = new AppointmentEntity({
      id,
      startDate,
      endDate,
      doctor: AppointmentEntity.accountMapper(doctor),
      patient: AppointmentEntity.accountMapper(patient),
      clinic: AppointmentEntity.clinicMapper(clinic),
      createdAt,
      createdBy,
      lastUpdate,
    });
    return appointment;
  }
}
