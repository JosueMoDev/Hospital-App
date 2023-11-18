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

import { CustomErrors, CustomValidationErrors } from "../shared";
import { CreateClinicDtoArgs } from "./createClinic.dto";

interface UpdatedClinicDtoArgs extends CreateClinicDtoArgs {
  id: string;
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

  @IsString({ message: "Name should contain only letters" })
  @IsNotEmpty({ message: "Name is required" })
  public name!: string;

  @IsPhoneNumber("SV", { message: "Phone Number not valid" })
  @IsOptional()
  public phone!: string;
  
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Address)
  public address!: Address;

  constructor(args: UpdatedClinicDtoArgs) {
    Object.assign(this, args);
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
