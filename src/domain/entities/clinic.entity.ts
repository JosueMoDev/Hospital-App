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
  photoURL: string;
  photoId: string;
  createdAt: Date;
  accountId: string;
  status: boolean;
  lastUpdate: LastUpdate[]
}

export class ClinicEntity {
  public id: string;
  public registerNumber: number;
  public name: string;
  public phone: string;
  public address: Address;
  public photoURL: string;
  public photoId: string;
  public createdAt: Date;
  public accountId: string;
  public stutus: boolean;
  public lastUpdate: LastUpdate[]

  constructor(options: ClinicOptions) {
    const {
      id,
      registerNumber,
      name,
      phone,
      address,
      photoURL,
      photoId,
      createdAt,
      accountId,
      status,
      lastUpdate
    } = options;

    this.id = id,
      this.registerNumber = registerNumber,
      this.name = name,
      this.phone = phone,
      this.address = address,
      this.photoURL = photoURL,
      this.photoId = photoId,
      this.createdAt = createdAt,
      this.accountId = accountId,
      this.stutus = status,
      this.lastUpdate = lastUpdate
  }

  static fromObject(object: { [key: string]: any }): ClinicEntity {
    const {
      id,
      registerNumber,
      name,
      phone,
      address,
      photoURL,
      photoId,
      createdAt,
      accountId,
      status,
      lastUpdate
    } = object;

    const clinic = new ClinicEntity({
      id,
      registerNumber,
      name,
      phone,
      address,
      photoURL,
      photoId,
      createdAt,
      accountId,
      status,
      lastUpdate
    });
    return clinic;
  }
}