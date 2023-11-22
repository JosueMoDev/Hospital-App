import { Type } from "class-transformer";
import { Gender, Role } from "../../entities";
import { CustomErrors, CustomValidationErrors, LastUpdate } from "../utils";
import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Length,
    MinLength,
    ValidateNested,

} from "class-validator";

interface UpdateAccountDtoArgs {
    id: string;
    duiNumber?: string;
    email?: string;
    password?: string;
    name?: string;
    lastname?: string;
    gender?: Gender;
    phone?: string;
    isValidated?: boolean;
    role?: Role;
    lastUpdate: LastUpdate
}


export class UpdateAccountDto {
  @IsMongoId()
  @IsNotEmpty({ message: "Id is required" })
  public id!: string;

  @IsOptional()
  @Length(9, 9, { message: "DUI Format not valid" })
  public duiNumber!: string;

  @IsOptional()
  @IsEmail({}, { message: "Email is not valid" })
  public email!: string;

  @IsOptional()
  @MinLength(8, { message: "Password should be at least 8 characters long" })
  public password!: string;

  @IsOptional()
  @IsString({ message: "Name should contain only letters" })
  public name!: string;

  @IsOptional()
  @IsString({ message: "Lastame should contain only letters" })
  public lastname!: string;

  @IsOptional()
  @IsEnum(Gender, { message: "Gender is not valid" })
  public gender!: Gender;
  @IsOptional()
  @IsPhoneNumber("SV", { message: "Phone Number not valid" })
  public phone!: string;

  @IsOptional()
  @IsBoolean()
  public isValidated!: boolean;
  @IsOptional()
  @IsEnum(Role, { message: "Role is not valid" })
  public role!: Role;

  @IsNotEmpty({ message: "Last Update is required" })
  @IsObject()
  @ValidateNested()
  @Type(() => LastUpdate)
  public lastUpdate!: LastUpdate;

  constructor(args: UpdateAccountDtoArgs) {
    Object.assign(this, args);
  }
  static update(
    object: UpdateAccountDtoArgs
  ): [undefined | CustomErrors[], UpdateAccountDto?] {
    const updateAccountDto = new UpdateAccountDto(object);

    const [errors, validatedDto] =
      CustomValidationErrors.validateDto<UpdateAccountDto>(updateAccountDto);

    if (errors) return [errors];

    return [undefined, validatedDto];
  }
}
