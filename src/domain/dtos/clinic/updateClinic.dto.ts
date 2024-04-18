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
  @IsOptional()
  @IsString()
  public street?: string;

  @IsOptional()
  @IsString()
  public state?: string;

  @IsOptional()
  @IsString()
  public city?: string;

  constructor(args: Address) {
    if (args.street) this.street = args?.street;
    if (args.state) this.state = args?.state;
    if (args.city) this.city = args?.city;
  }
}
export class UpdateClinicDto {
  @IsMongoId()
  @IsNotEmpty({ message: "Clinic ID is required" })
  public id: string;

  @IsOptional()
  @Length(12, 12 , { message: "Register Number  Format not valid" })
  public registerNumber?: string;

  @IsOptional()
  @IsString({ message: "Name should contain only letters" })
  public name?: string;

  @IsPhoneNumber("SV", { message: "Phone Number not valid" })
  @IsOptional()
  public phone?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Address)
  public address?: Address | undefined;

  @IsNotEmpty({ message: "Last Update is required" })
  @IsObject()
  @ValidateNested()
  @Type(() => LastUpdate)
  public lastUpdate: LastUpdate;

  constructor(args: UpdatedClinicDtoArgs) {
    const { id, registerNumber, name, phone, address, lastUpdate } = args;
    this.id = id;
    this.registerNumber = registerNumber;
    this.name = name;
    this.phone = phone;
    this.address = address ? new Address(address) : undefined;
    this.lastUpdate = new LastUpdate(lastUpdate);
  }
  static update(
    object: UpdatedClinicDtoArgs
  ): [undefined | CustomErrors[], UpdateClinicDto?] {

    const updateClinicDto = new UpdateClinicDto(object);

    const [errors, validatedDto] =
      CustomValidationErrors.validateDto<UpdateClinicDto>(updateClinicDto);

    if (errors) return [errors];

    const dto = Object.fromEntries(
      Object.entries(validatedDto!).filter(([_, value]) => value !== undefined)
    ) as UpdateClinicDto;


    return [undefined, dto];
  }
}
