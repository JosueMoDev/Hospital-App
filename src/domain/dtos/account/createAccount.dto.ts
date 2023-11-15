import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength,
  validateSync,
} from "class-validator";
import { Gender, Role } from "../../entities";


interface CreateAccountDtoArgs {
  duiNumber: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  gender: Gender;
  phone: string;
  isValidated?: boolean;
  role: Role;
}
export class CreateAccountDto {

  @Length(9, 9, { message: "DUI Format not valid" })
  @IsNotEmpty({ message: "DUI is required" })
  public duiNumber: string;

  @IsEmail({}, { message: "Email is not valid" })
  @IsNotEmpty({ message: "Email is required" })
  public email: string;

  @MinLength(8, { message: "Password should be at least 8 characters long" })
  @IsNotEmpty({ message: "Password is required" })
  public password: string;

  @IsString({ message: "Name should contain only letters" })
  @IsNotEmpty({ message: "Name is required" })
  public name: string;

  @IsString({ message: "Lastame should contain only letters" })
  @IsNotEmpty({ message: "Lastname is required" })
  public lastname: string;

  @IsEnum(Gender, { message: "Gender is not valid" })
  @IsNotEmpty({ message: "Gender is required" })
  public gender: Gender;

  @IsPhoneNumber("SV", { message: "Phone Number not valid" })
  @IsNotEmpty({ message: "Phone Number is required" })
  public phone: string;

  @IsBoolean()
  public isValidated: boolean;

  @IsEnum(Role, { message: "Role is not valid" })
  @IsNotEmpty({ message: "Role is required" })
  public role: Role;

  constructor(args: CreateAccountDtoArgs) {
    const {
      email,
      password,
      duiNumber,
      name,
      lastname,
      gender,
      phone,
      isValidated,
      role,
    } = args;
      
    this.email = email,
    this.password = password,
    this.duiNumber = duiNumber,
    this.name = name,
    this.lastname = lastname,
    this.gender = gender,
    this.phone = phone,
    this.isValidated = isValidated !== undefined ? isValidated : false,
    this.role = role
  }

  static create(object: CreateAccountDtoArgs): [undefined | {[key: string]: string }, CreateAccountDto?] {
    const createAccountDto = new CreateAccountDto(object);

    const errors = validateSync(createAccountDto);

    if (errors.length > 0) {
      return [errors[0].constraints];
    }

    return [undefined, createAccountDto];
  }
}
