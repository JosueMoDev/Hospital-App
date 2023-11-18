import { Type } from "class-transformer";
import {
    IsMongoId,
    IsNotEmpty,
    IsObject,
    IsPhoneNumber,
    IsString,
    Length,
    ValidateNested,
} from "class-validator";

import { CustomErrors, CustomValidationErrors } from "../utils";


interface CreateClinicDtoArgs {
    registerNumber: string,
    name: string,
    phone: string,
    address: Address | any,
    createdBy: string
}

class Address {
    @IsString()
    @IsNotEmpty()
    public street!: string;

    @IsString()
    @IsNotEmpty()
    public state!: string;

    @IsString()
    @IsNotEmpty()
    public city!: string;

    constructor(street: string, state: string, city: string) {
        this.street = street;
        this.state = state;
        this.city = city;
    }
}
export class CreateClinicDto {

    @Length(9, 9, { message: "Register Number  Format not valid" })
    @IsNotEmpty({ message: "Register Number is required" })
    public registerNumber!: string;


    @IsString({ message: "Name should contain only letters" })
    @IsNotEmpty({ message: "Name is required" })
    public name!: string;


    @IsPhoneNumber("SV", { message: "Phone Number not valid" })
    @IsNotEmpty({ message: "Phone Number is required" })
    public phone!: string;


    @IsObject()
    @ValidateNested()
    @Type(() => Address)
    public address!: Address;

    @IsMongoId()
    public readonly createdBy!: string


    constructor(args: CreateClinicDtoArgs) {
        Object.assign(this, args);
        const street = args.address ? args.address.street : undefined;
        const state = args.address ? args.address.state : undefined;
        const city = args.address ? args.address.city : undefined;

        this.address = new Address(street, state, city);
    }

    static create(object: CreateClinicDtoArgs): [undefined | CustomErrors[], CreateClinicDto?] {
        const createClinicDto = new CreateClinicDto(object);

        const [errors, validatedDto] = CustomValidationErrors.validateDto<CreateClinicDto>(createClinicDto);

        if (errors) return [errors];

        return [undefined, validatedDto];
    }
}