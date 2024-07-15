export interface APIDOCSCHEMAS {
  LastUpdate?: LastUpdateClass;
  ChangePasswordDto?: ChangePasswordDto;
  ConfirmPasswordDto?: ConfirmPasswordDto;
  CreateAccountDto?: CreateAccountDto;
  UpdateAccountDto?: UpdateAccountDto;
  CreateAppointmentDto?: CreateAppointmentDto;
  UpdateAppointmentDto?: UpdateAppointmentDto;
  LoginDto?: LoginDto;
  Doctors?: DoctorsClass;
  ClinicAssignmentDto?: ClinicAssignmentDto;
  GetDoctorsAssignedDto?: GetDoctorsAssignedDto;
  Address?: Address;
  CreateClinicDto?: CreateClinicDto;
  UpdateClinicDto?: UpdateClinicDto;
  PaginationDto?: PaginationDto;
  CreateRecordDto?: CreateRecordDto;
  UpdateRecordDto?: UpdateRecordDto;
}

export interface Address {
  properties: AddressProperties;
  type: string;
}

export interface AddressProperties {
  street: City;
  state: City;
  city: City;
}

export interface City {
  minLength: number;
  type: Type;
}

export enum Type {
  String = "string",
}

export interface ClinicAssignmentDto {
  properties: ClinicAssignmentDtoProperties;
  type: string;
  required: string[];
}

export interface ClinicAssignmentDtoProperties {
  clinic: Clinic;
  doctors: Doctors;
}

export interface Clinic {
  minLength: number;
  type: Type;
  pattern: Pattern;
}

export enum Pattern {
  The09AFAF24$ = "^[0-9a-fA-F]{24}$",
}

export interface Doctors {
  items: LastUpdate;
  minItems: number;
  type: Type;
  minLength: number;
}

export interface LastUpdate {}

export interface ConfirmPasswordDto {
  properties: ConfirmPasswordDtoProperties;
  type: string;
  required: string[];
}

export interface ConfirmPasswordDtoProperties {
  id: Clinic;
  password: City;
}

export interface CreateAccountDto {
  properties: CreateAccountDtoProperties;
  type: string;
  required: string[];
}

export interface CreateAccountDtoProperties {
  duiNumber: Number;
  email: PurpleEmail;
  password: City;
  name: City;
  lastname: City;
  gender: PurpleGender;
  phone: City;
  isValidated: IsValidated;
  role: PurpleGender;
}

export interface Number {
  minLength: number;
  type: Type;
  maxLength: number;
}

export interface PurpleEmail {
  minLength: number;
  type: Type;
  format: Format;
}

export enum Format {
  Date = "date",
  DateTime = "date-time",
  Email = "email",
}

export interface PurpleGender {
  minLength: number;
  type: Type;
  enum: string[];
}

export interface IsValidated {
  type: string;
}

export interface CreateAppointmentDto {
  properties: CreateAppointmentDtoProperties;
  type: string;
  required: string[];
}

export interface CreateAppointmentDtoProperties {
  startDate: PurpleDate;
  endDate: PurpleDate;
  doctorId: Clinic;
  patientId: Clinic;
  clinicId: Clinic;
  createdBy: Clinic;
}

export interface PurpleDate {
  oneOf: EmailElement[];
  minLength: number;
  type: Type;
}

export interface EmailElement {
  format: Format;
  type: Type;
}

export interface CreateClinicDto {
  properties: CreateClinicDtoProperties;
  type: string;
  required: string[];
}

export interface CreateClinicDtoProperties {
  registerNumber: Number;
  name: City;
  phone: City;
  address: AddressClass;
  createdBy: CreatedBy;
}

export interface AddressClass {
  $ref: string;
  type: string;
}

export interface CreatedBy {
  pattern: Pattern;
  type: Type;
}

export interface CreateRecordDto {
  properties: CreateRecordDtoProperties;
  type: string;
  required: string[];
}

export interface CreateRecordDtoProperties {
  doctorId: Clinic;
  patientId: Clinic;
  title: City;
}

export interface DoctorsClass {
  properties: DoctorsProperties;
  type: string;
  required: string[];
}

export interface DoctorsProperties {
  doctor: Clinic;
}

export interface GetDoctorsAssignedDto {
  properties: GetDoctorsAssignedDtoProperties;
  type: string;
  required: string[];
}

export interface GetDoctorsAssignedDtoProperties {
  clinic: Clinic;
}

export interface LastUpdateClass {
  properties: LastUpdateProperties;
  type: string;
  required: string[];
}

export interface LastUpdateProperties {
  account: Clinic;
  date: DateClass;
}

export interface DateClass {
  pattern: string;
  type: Type;
  oneOf: EmailElement[];
}

export interface LoginDto {
  properties: LoginDtoProperties;
  type: string;
  required: string[];
}

export interface LoginDtoProperties {
  email: PurpleEmail;
  password: City;
}

export interface PaginationDto {
  properties: PaginationDtoProperties;
  type: string;
}

export interface PaginationDtoProperties {
  page: Page;
  pageSize: Page;
}

export interface Page {
  minimum: number;
  type: string;
  exclusiveMinimum: number;
}

export interface UpdateAccountDto {
  properties: UpdateAccountDtoProperties;
  type: string;
  required: string[];
}

export interface UpdateAccountDtoProperties {
  id: Clinic;
  duiNumber: Number;
  email: EmailElement;
  password: City;
  name: IsValidated;
  lastname: IsValidated;
  gender: FluffyGender;
  phone: IsValidated;
  isValidated: IsValidated;
  role: FluffyGender;
}

export interface FluffyGender {
  enum: string[];
  type: Type;
}

export interface UpdateAppointmentDto {
  properties: UpdateAppointmentDtoProperties;
  type: string;
  required: string[];
}

export interface UpdateAppointmentDtoProperties {
  id: Clinic;
  startDate: FluffyDate;
  endDate: FluffyDate;
  doctorId: CreatedBy;
  clinicId: CreatedBy;
  patientId: CreatedBy;
  lastUpdate: PurpleLastUpdate;
}

export interface FluffyDate {
  oneOf: EmailElement[];
}

export interface PurpleLastUpdate {
  $ref: string;
  type: Type;
  minLength: number;
}

export interface UpdateClinicDto {
  properties: UpdateClinicDtoProperties;
  type: string;
  required: string[];
}

export interface UpdateClinicDtoProperties {
  id: Clinic;
  registerNumber: Number;
  name: IsValidated;
  phone: IsValidated;
  address: AddressClass;
  lastUpdate: PurpleLastUpdate;
}

export interface ChangePasswordDto {
  properties: UpdatePasswordDtoProperties;
  type: string;
  required: string[];
}

export interface UpdatePasswordDtoProperties {
  account: Clinic;
  newPassword: City;
  oldPassword: City;
}

export interface UpdateRecordDto {
  properties: UpdateRecordDtoProperties;
  type: string;
  required: string[];
}

export interface UpdateRecordDtoProperties {
  id: Clinic;
  doctorId: CreatedBy;
  patientId: CreatedBy;
  title: IsValidated;
  lastUpdate: PurpleLastUpdate;
}


export interface UploadDtoProperties {
  id: Clinic;
  lastUpdate: LastUpdate;
}
