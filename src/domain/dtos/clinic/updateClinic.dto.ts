import { Type } from "class-transformer";
import {
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateNested,
} from "class-validator";

import { CustomErrors, CustomValidationErrors, LastUpdate } from "../utils";


interface UpdatedClinicDtoArgs {
  id: string;
  registerNumber?: string,
  name?: string,
  phone?: string,
  address?: Address,
  createdBy?: string,
  lastUpdate: LastUpdate,

}

class Address {
  @IsString()
  @IsNotEmpty()
  public street!: string;

  @IsString()
  @IsNotEmpty()
  public province!: string;

  @IsString()
  @IsNotEmpty()
  public city!: string;

  constructor(args: { street: string; province: string; city: string }) {
    Object.assign(this, args);
  }
}
export class UpdateClinicDto {
  @IsMongoId()
  @IsNotEmpty({ message: "Clinic ID is required" })
  public id!: string;

  @IsOptional()
  @Length(9, 9, { message: "Register Number  Format not valid" })
  @IsOptional()
  public registerNumber!: string;
  @IsOptional()
  @IsString({ message: "Name should contain only letters" })
  public name!: string;

  @IsPhoneNumber("SV", { message: "Phone Number not valid" })
  @IsOptional()
  public phone!: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Address)
  public address!: Address;

  @IsNotEmpty({ message: "Last Update is required" })
  @IsObject()
  @ValidateNested()
  @Type(() => LastUpdate)
  public lastUpdate!: LastUpdate;

  constructor(args: UpdatedClinicDtoArgs) {
    Object.assign(this, args);
    this.lastUpdate = new LastUpdate(args.lastUpdate);
  }

  static update(
    object: UpdatedClinicDtoArgs
  ): [undefined | CustomErrors[], UpdateClinicDto?] {
    const updateClinicDto = new UpdateClinicDto(object);

    const [errors, validatedDto] =
      CustomValidationErrors.validateDto<UpdateClinicDto>(updateClinicDto);

    if (errors) return [errors];

    return [undefined, validatedDto];
  }
}
