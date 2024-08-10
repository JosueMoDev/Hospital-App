import { Gender, Role } from '../../entities';
import { CustomErrors, CustomValidationErrors } from '../utils';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

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
  updatedBy: string;
}

export class UpdateAccountDto {
  @IsMongoId()
  @IsNotEmpty({ message: 'Id is required' })
  public id!: string;

  @IsOptional()
  @Length(9, 9, { message: 'DUI Format not valid' })
  public duiNumber!: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email is not valid' })
  public email!: string;

  @IsOptional()
  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  public password!: string;

  @IsOptional()
  @IsString({ message: 'Name should contain only letters' })
  public name!: string;

  @IsOptional()
  @IsString({ message: 'Lastame should contain only letters' })
  public lastname!: string;

  @IsOptional()
  @IsEnum(Gender, { message: 'Gender is not valid' })
  public gender!: Gender;
  @IsOptional()
  @IsPhoneNumber('SV', { message: 'Phone Number not valid' })
  public phone!: string;

  @IsOptional()
  @IsBoolean()
  public isValidated!: boolean;
  @IsOptional()
  @IsEnum(Role, { message: 'Role is not valid' })
  public role!: Role;

  @IsMongoId()
  @IsNotEmpty({ message: 'Id is required' })
  public updatedBy!: string;

  constructor(args: UpdateAccountDtoArgs) {
    this.id = args.id;
    if (args.duiNumber) this.duiNumber = args.duiNumber;
    if (args.email) this.email = args.email;
    if (args.password) this.password = args.password;
    if (args.name) this.name = args.name;
    if (args.lastname) this.lastname = args.lastname;
    if (args.gender) this.gender = args.gender;
    if (args.phone) this.phone = args.phone;
    if (args.isValidated) this.isValidated = args.isValidated;
    if (args.role) this.role = args.role;
    this.updatedBy = args.updatedBy;
  }
  static update(
    object: UpdateAccountDtoArgs,
  ): [undefined | CustomErrors[], UpdateAccountDto?] {
    const updateAccountDto = new UpdateAccountDto(object);

    const [errors, validatedDto] =
      CustomValidationErrors.validateDto<UpdateAccountDto>(updateAccountDto);

    if (errors) return [errors];

    return [undefined, validatedDto];
  }
}
