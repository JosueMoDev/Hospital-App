import { Gender, Role } from '../../entities';
import { CreateAccountDtoArgs, ErrorDefinition } from './AccountDto.interface';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength,
  ValidationError,
  validateSync,
} from "class-validator";

export class CreateAccountDto {
  @Length(9, 9, { message: "DUI Format not valid" })
  @IsNotEmpty({ message: "DUI is required" })
  public duiNumber!: string;

  @IsEmail({}, { message: "Email is not valid" })
  @IsNotEmpty({ message: "Email is required" })
  public email!: string;

  @MinLength(8, { message: "Password should be at least 8 characters long" })
  @IsNotEmpty({ message: "Password is required" })
  public password!: string;

  @IsString({ message: "Name should contain only letters" })
  @IsNotEmpty({ message: "Name is required" })
  public name!: string;

  @IsString({ message: "Lastame should contain only letters" })
  @IsNotEmpty({ message: "Lastname is required" })
  public lastname!: string;

  @IsEnum(Gender, { message: "Gender is not valid" })
  @IsNotEmpty({ message: "Gender is required" })
  public gender!: Gender;

  @IsPhoneNumber("SV", { message: "Phone Number not valid" })
  @IsNotEmpty({ message: "Phone Number is required" })
  public phone!: string;

  @IsBoolean()
  public isValidated: boolean;

  @IsEnum(Role, { message: "Role is not valid" })
  @IsNotEmpty({ message: "Role is required" })
  public role!: Role;

  constructor(args: CreateAccountDtoArgs) {
    Object.assign(this, args);
    this.isValidated = args.isValidated ?? false;
  }
  static create(
    object: CreateAccountDtoArgs
  ): [undefined | ErrorDefinition[], CreateAccountDto?] {
    const updateAccountDto = new CreateAccountDto(object);
    const [errors, validatedDto] = CreateAccountDto.validateDto(updateAccountDto);
    if (errors) {
      return [errors];
    }

    return [undefined, validatedDto];
  }

  protected static validateDto(
    dto: CreateAccountDto
  ): [undefined | ErrorDefinition[], CreateAccountDto?] {
    const errors = validateSync(dto);
    if (errors !== undefined && errors.length > 0) {
      const errorsMapped = errors.map((error: ValidationError): ErrorDefinition => ({
        errorOnProperty: error.property,
        errorMessages: error.constraints!
      }));
      return [errorsMapped];
    }
    return [undefined, dto];
  }
}
