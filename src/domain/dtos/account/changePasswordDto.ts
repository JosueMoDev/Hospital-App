import { Type } from "class-transformer";
import { CustomErrors, CustomValidationErrors, LastUpdate } from "../utils";
import {
  IsMongoId,
  IsNotEmpty,
  IsObject,
  MinLength,
  ValidateNested,
} from "class-validator";

interface UpdatePasswordDtoArgs {
  account: string;
  newPassword: string;
  oldPassword: string;
}

export class ChangePasswordDto {
  @IsMongoId()
  @IsNotEmpty({ message: "account is required" })
  public account!: string;

  @IsNotEmpty()
  @MinLength(8, { message: "Password should be at least 8 characters long" })
  public newPassword!: string;

  @IsNotEmpty()
  @MinLength(8, { message: "Password should be at least 8 characters long" })
  public oldPassword!: string;

  constructor(args: ChangePasswordDto) {
    this.account = args.account;
    this.newPassword = args.newPassword;
    this.oldPassword = args.oldPassword;
  }
  static update(
    object: UpdatePasswordDtoArgs
  ): [undefined | CustomErrors[], ChangePasswordDto?] {
    const updateAccountDto = new ChangePasswordDto(object);

    const [errors, validatedDto] =
      CustomValidationErrors.validateDto<ChangePasswordDto>(updateAccountDto);

    if (errors) return [errors];

    return [undefined, validatedDto];
  }
}
