export interface AppointmentEntityOptions {
  id: string;
  startDate: Date;
  endDate: Date;
  doctorId: string;
  patientId: string;
  createdAt: Date;
  createdBy: string;
}

export class AppointmentEntity {
  public id: string;
  public startDate: Date;
  public endDate: Date;
  public doctorId: string;
  public patientId: string;
  public createdAt: Date;
  public createdBy: string;

  constructor(options: AppointmentEntityOptions) {
    const {
      id,
      startDate,
      endDate,
      doctorId,
      patientId,
      createdAt,
      createdBy
    } = options;

    this.id = id,
      this.startDate = startDate,
      this.endDate = endDate,
      this.doctorId = doctorId,
      this.patientId = patientId,
      this.createdAt = createdAt,
      this.createdBy = createdBy;

  }

  static fromObject(object: { [key: string]: any }): AppointmentEntity {
    const { id, startDate, endDate, doctorId, patientId, createdAt, createdBy } = object;
    const appointment = new AppointmentEntity({
      id,
      startDate,
      endDate,
      doctorId,
      patientId,
      createdAt,
      createdBy,
    });
    return appointment;
  }

}