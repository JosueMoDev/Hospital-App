
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
  createdBy: string;
  status: boolean;
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
  public createdBy: string;
  public stutus: boolean;

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
      createdBy,
      status,
    } = options;

    this.id = id,
      this.registerNumber = registerNumber,
      this.name = name,
      this.phone = phone,
      this.address = address,
      this.photoURL = photoURL,
      this.photoId = photoId,
      this.createdAt = createdAt,
      this.createdBy = createdBy,
      this.stutus = status
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
      status
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
      createdBy: accountId,
      status
    });
    return clinic;
  }
}