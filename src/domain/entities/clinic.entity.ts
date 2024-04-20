import { LastUpdate } from "@prisma/client";

export interface Address {
  city: string,
  state: string,
  street: string
}
export interface ClinicOptions {
  id: string;
  registerNumber: number;
  name: string;
  phone: string;
  address: Address;
  photoUrl: string;
  photoId: string;
  createdAt: Date;
  createdBy: string;
  status: boolean;
  lastUpdate: LastUpdate[]
}

export class ClinicEntity {
  public id: string;
  public registerNumber: number;
  public name: string;
  public phone: string;
  public address: Address;
  public photoUrl: string;
  public photoId: string;
  public createdAt: Date;
  public createdBy: string;
  public status: boolean;
  public lastUpdate: LastUpdate[]

  constructor(options: ClinicOptions) {
    const {
      id,
      registerNumber,
      name,
      phone,
      address,
      photoUrl,
      photoId,
      createdAt,
      createdBy,
      status,
      lastUpdate
    } = options;

    this.id = id,
      this.registerNumber = registerNumber,
      this.name = name,
      this.phone = phone,
      this.address = address,
      this.photoUrl = photoUrl,
      this.photoId = photoId,
      this.createdAt = createdAt,
      this.createdBy = createdBy,
      this.status = status,
      this.lastUpdate = lastUpdate
  }

  static fromObject(object: { [key: string]: any }): ClinicEntity {
    const {
      id,
      registerNumber,
      name,
      phone,
      address,
      photoUrl,
      photoId,
      createdAt,
      createdBy,
      status,
      lastUpdate
    } = object;

    const clinic = new ClinicEntity({
      id,
      registerNumber,
      name,
      phone,
      address,
      photoUrl,
      photoId,
      createdAt,
      createdBy,
      status,
      lastUpdate: lastUpdate ?? []
    });
    return clinic;
  }
}