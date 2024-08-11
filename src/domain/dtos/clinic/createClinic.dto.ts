import { CustomValidatorErrors } from '@handler-errors';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';


interface CreateClinicDtoArgs {
  registerNumber: string;
  name: string;
  phone: string;
  address: Address;
  createdBy: string;
}

class Address {
  @IsString()
  @IsNotEmpty()
  public street: string;

  @IsString()
  @IsNotEmpty()
  public state: string;

  @IsString()
  @IsNotEmpty()
  public city: string;

  constructor(args: Address) {
    const { street, state, city } = args;
    this.street = street;
    this.state = state;
    this.city = city;
  }
}
export class CreateClinicDto {
  @Length(12, 12, { message: 'Register Number  Format not valid' })
  @IsNotEmpty({ message: 'Register Number is required' })
  public registerNumber: string;

  @IsString({ message: 'Name should contain only letters' })
  @IsNotEmpty({ message: 'Name is required' })
  public name: string;

  @IsPhoneNumber('SV', { message: 'Phone Number not valid' })
  @IsNotEmpty({ message: 'Phone Number is required' })
  public phone: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Address)
  public address: Address;

  @IsMongoId()
  public readonly createdBy: string;

  constructor(args: CreateClinicDtoArgs) {
    const { registerNumber, name, phone, address, createdBy } = args;
    this.registerNumber = registerNumber;
    this.name = name;
    this.phone = phone;
    this.address = new Address(address);
    this.createdBy = createdBy;
  }

  static create(
    object: CreateClinicDtoArgs,
  ): [undefined | string[], CreateClinicDto?] {
    const createClinicDto = new CreateClinicDto(object);

    const [errors, validatedDto] =
      CustomValidatorErrors.validateDto<CreateClinicDto>(createClinicDto);

    if (errors) return [errors];

    return [undefined, validatedDto];
  }
}
