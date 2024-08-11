import { CustomValidatorErrors } from '@handler-errors';
import { IsMongoId, IsNotEmpty, MinLength } from 'class-validator';

interface ChangePasswordDtoArgs {
  account: string;
  newPassword: string;
  oldPassword: string;
  updatedBy: string;
}

export class ChangePasswordDto {
  @IsMongoId()
  @IsNotEmpty({ message: 'account is required' })
  public account!: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  public newPassword!: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  public oldPassword!: string;

  @IsMongoId()
  @IsNotEmpty({ message: 'account is required' })
  public updatedBy!: string;

  constructor(args: ChangePasswordDto) {
    this.account = args.account;
    this.newPassword = args.newPassword;
    this.oldPassword = args.oldPassword;
    this.updatedBy = args.updatedBy;
  }
  static update(
    object: ChangePasswordDtoArgs,
  ): [undefined | string[], ChangePasswordDto?] {
    const updateAccountDto = new ChangePasswordDto(object);

    const [errors, validatedDto] =
      CustomValidatorErrors.validateDto<ChangePasswordDto>(updateAccountDto);

    if (errors) return [errors];

    return [undefined, validatedDto];
  }
}
