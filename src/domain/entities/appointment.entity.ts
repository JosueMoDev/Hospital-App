export interface AppointmentEntityOptions {
    startDate: Date;
    endDate: Date;
    doctor: string;
    patient: string;
    createdAt: Date;
    createdBy: string;
}

export class AppointmentEntity {
  public startDate: Date;
  public endDate: Date;
  public doctor: string;
  public patient: string;
  public createdAt: Date;
  public createdBy: string;

  constructor(options: AppointmentEntityOptions) {
    const {
        startDate,
        endDate,
        doctor,
        patient,
        createdAt,
        createdBy
    } = options;

     
    this.startDate = startDate, 
    this.endDate = endDate, 
    this.doctor = doctor, 
    this.patient = patient, 
    this.createdAt = createdAt, 
    this.createdBy = createdBy;

  }

  static fromObject(object:{[key:string]: any}): AppointmentEntity {
    const { startDate, endDate, doctor, patient, createdAt, createdBy } = object;
    const appointment = new AppointmentEntity({
      startDate,
      endDate,
      doctor,
      patient,
      createdAt,
      createdBy,
    });
    return appointment;
  }

}