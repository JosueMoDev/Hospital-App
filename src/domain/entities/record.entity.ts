import { LastUpdate } from "@prisma/client";
import { AccountEntity } from "./account.entity";

type Account = Partial<Pick<AccountEntity, "id" | "duiNumber" | "name" | "lastname" | "email" | "photoUrl" | "phone">>;

interface RecordOptions {
  id: string;
  doctor: Account;
  patient: Account;
  createdAt: Date;
  title: string;
  pdfUrl: string;
  pdfId: string;
  status: boolean;
  lastUpdate: LastUpdate[];
}

export class RecordEntity {
  public id: string;
  public doctor: Account;
  public patient: Account;
  public createdAt: Date;
  public title: string;
  public pdfUrl: string;
  public pdfId: string;
  public status: boolean;
  public lastUpdate: LastUpdate[];

  constructor(options: RecordOptions) {
    const {
      id,
      doctor,
      patient,
      createdAt,
      title,
      pdfUrl,
      pdfId,
      status,
      lastUpdate,
    } = options;

    this.id = id;
    this.doctor = doctor;
    this.patient = patient;
    this.createdAt = createdAt;
    this.title = title;
    this.pdfUrl = pdfUrl;
    this.pdfId = pdfId;
    this.status = status;
    this.lastUpdate = lastUpdate;
  }

  static accountMapper(object: { [key: string]: any }): Account {
    const { id, duiNumber, name, lastname, phone, photoUrl, email } = object;
    return { id, duiNumber, name, lastname, phone, photoUrl, email };
  }

  static fromObject(object: { [key: string]: any }): RecordEntity {
    const {
      id,
      patient_record,
      doctor_record,
      createdAt,
      title,
      pdfUrl,
      pdfId,
      status,
      lastUpdate,
    } = object;

    const record = new RecordEntity({
      id,
      doctor: RecordEntity.accountMapper(doctor_record),
      patient: RecordEntity.accountMapper(patient_record),
      createdAt,
      title,
      pdfUrl,
      pdfId,
      status,
      lastUpdate,
    });

    return record;
  }
}
