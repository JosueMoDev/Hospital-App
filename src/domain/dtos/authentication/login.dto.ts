import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { CustomErrors, CustomValidationErrors } from '../utils';
interface LoginDtoOptions {
  email: string;
  password: string;
}
export class LoginDto {
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email is required' })
  public email!: string;

  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  @IsNotEmpty({ message: 'Password is required' })
  public password!: string;

  constructor(args: LoginDto) {
    Object.assign(this, args);
  }

  static create(
    object: LoginDtoOptions,
  ): [undefined | CustomErrors[], LoginDto?] {
    const loginDto = new LoginDto(object);

    const [errors, validatedDto] =
      CustomValidationErrors.validateDto<LoginDto>(loginDto);

    if (errors) return [errors];

    return [undefined, validatedDto];
  }
}
