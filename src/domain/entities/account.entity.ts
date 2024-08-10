import { LastUpdate } from '@prisma/client';

export enum Role {
  admin = 'admin',
  patient = 'patient',
  doctor = 'doctor',
}

export enum Gender {
  female = 'female',
  male = 'male',
}

export interface AccountEntityOptions {
  id: string;
  duiNumber: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  gender: Gender;
  phone: string;
  isValidated: boolean;
  role: Role;
  photoUrl: string;
  photoId: string;
  createdAt: Date;
  lastUpdate: LastUpdate[];
}

export class AccountEntity {
  public id: string;
  public duiNumber: string;
  public email: string;
  public password: string;
  public name: string;
  public lastname: string;
  public gender: Gender;
  public phone: string;
  public isValidated: boolean;
  public role: Role;
  public photoUrl: string;
  public photoId: string;
  public createdAt: Date;
  public lastUpdate: LastUpdate[];

  constructor(options: AccountEntityOptions) {
    const {
      id,
      duiNumber,
      email,
      password,
      name,
      lastname,
      gender,
      phone,
      isValidated,
      role,
      photoUrl,
      photoId,
      createdAt = new Date(),
      lastUpdate,
    } = options;

    this.id = id;
    this.duiNumber = duiNumber;
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastname = lastname;
    this.gender = gender;
    this.phone = phone;
    this.isValidated = isValidated;
    this.role = role;
    this.photoUrl = photoUrl;
    this.photoId = photoId;
    this.createdAt = createdAt;
    this.lastUpdate = lastUpdate;
  }

  static fromObject(object: { [key: string]: any }): AccountEntity {
    const {
      id,
      duiNumber,
      email,
      password,
      name,
      lastname,
      gender,
      phone,
      isValidated,
      role,
      photoUrl,
      photoId,
      createdAt,
      lastUpdate,
    } = object;

    const account = new AccountEntity({
      id,
      duiNumber,
      email,
      password,
      name,
      lastname,
      gender,
      phone,
      isValidated,
      role,
      photoUrl,
      photoId,
      createdAt,
      lastUpdate: lastUpdate ?? [],
    });

    return account;
  }
}
