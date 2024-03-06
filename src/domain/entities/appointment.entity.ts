import { LastUpdate } from "@prisma/client";

export interface AppointmentEntityOptions {
  id: string;
  startDate: Date;
  endDate: Date;
  doctorId: string;
  patientId: string;
  createdAt: Date;
  createdBy: string;
  lastUpdate: LastUpdate[]
}

export class AppointmentEntity {
  public id: string;
  public startDate: Date;
  public endDate: Date;
  public doctorId: string;
  public patientId: string;
  public createdAt: Date;
  public createdBy: string;
  public lastUpdate: LastUpdate[]

  constructor(options: AppointmentEntityOptions) {
    const {
      id,
      startDate,
      endDate,
      doctorId,
      patientId,
      createdAt,
      createdBy,
      lastUpdate,

    } = options;

    this.id = id,
    this.startDate = startDate,
    this.endDate = endDate,
    this.doctorId = doctorId,
    this.patientId = patientId,
    this.createdAt = createdAt,
    this.createdBy = createdBy;
    this.lastUpdate = lastUpdate;

  }

  static fromObject(object: AppointmentEntity ): AppointmentEntity {
    const { id, startDate, endDate, doctorId, patientId, createdAt, createdBy, lastUpdate } = object;
    const appointment = new AppointmentEntity({
      id,
      startDate,
      endDate,
      doctorId,
      patientId,
      createdAt,
      createdBy,
      lastUpdate
    });
    return appointment;
  }

}