import { Type } from "class-transformer";
import { CustomErrors, CustomValidationErrors, LastUpdate } from "../utils";
import {
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  MinLength,
  ValidateNested,
} from "class-validator";

interface UpdatePasswordDtoArgs {
  id: string;
  newPassword: string;
  oldPassword: string;
  lastUpdate: LastUpdate;
}

export class UpdatePasswordDto {
  @IsMongoId()
  @IsNotEmpty({ message: "Id is required" })
  public id!: string;

  @IsOptional()
  @MinLength(8, { message: "Password should be at least 8 characters long" })
  public newPassword!: string;

  @IsOptional()
  @MinLength(8, { message: "Password should be at least 8 characters long" })
  public oldPassword!: string;


  @IsNotEmpty({ message: "Last Update is required" })
  @IsObject()
  @ValidateNested()
  @Type(() => LastUpdate)
  public lastUpdate!: LastUpdate;

  constructor(args: UpdatePasswordDto) {
    Object.assign(this, args);
  }
  static update(
    object: UpdatePasswordDtoArgs
  ): [undefined | CustomErrors[], UpdatePasswordDto?] {
    const updateAccountDto = new UpdatePasswordDto(object);

    const [errors, validatedDto] =
      CustomValidationErrors.validateDto<UpdatePasswordDto>(updateAccountDto);

    if (errors) return [errors];

    return [undefined, validatedDto];
  }
}
