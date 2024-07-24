import { Transform } from 'class-transformer';
import { Gender, Role } from '../../entities';
import { CustomErrors, CustomValidationErrors } from '../utils';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

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
  @Transform(({ value }) => value.toString()) // Transforma el valor a string para Swagger
  @Length(9, 9, { message: 'DUI Format not valid' })
  @IsNotEmpty({ message: 'DUI is required' })
  duiNumber!: string;

  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  @IsNotEmpty({ message: 'Password is required' })
  password!: string;

  @IsString({ message: 'Name should contain only letters' })
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsString({ message: 'Lastname should contain only letters' })
  @IsNotEmpty({ message: 'Lastname is required' })
  lastname!: string;

  @IsEnum(Gender, { message: 'Gender is not valid' })
  @IsNotEmpty({ message: 'Gender is required' })
  gender!: Gender;

  @Transform(({ value }) => value.toString()) // Transforma el valor a string para Swagger
  @IsPhoneNumber('SV', { message: 'Phone Number not valid' })
  @IsNotEmpty({ message: 'Phone Number is required' })
  phone!: string;

  @Transform(({ value }) => value === 'true') // Transforma el valor a boolean para Swagger
  @IsBoolean()
  isValidated: boolean;

  @IsEnum(Role, { message: 'Role is not valid' })
  @IsNotEmpty({ message: 'Role is required' })
  role!: Role;

  constructor(args: CreateAccountDtoArgs) {
    Object.assign(this, args);
    this.isValidated = args.isValidated ?? false;
  }
  static create(
    object: CreateAccountDtoArgs,
  ): [undefined | CustomErrors[], CreateAccountDto?] {
    const createAccountDto = new CreateAccountDto(object);

    const [errors, validatedDto] =
      CustomValidationErrors.validateDto<CreateAccountDto>(createAccountDto);

    if (errors) return [errors];

    return [undefined, validatedDto];
  }
}
