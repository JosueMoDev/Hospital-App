import { Type } from "class-transformer";
import {
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateNested,
  validateSync,
  
} from "class-validator";


interface CreateClinicDtoArgs {
    registerNumber: string,
    name: string,
    phone: string,
    address: Address,
    createdBy: string

}

class Address {
    @IsString()
    @IsNotEmpty()
    public street: string;

    @IsString()
    @IsNotEmpty()
    public province: string;

    @IsString()
    @IsNotEmpty()
    public city: string;
        
    constructor (street: string, province:string, city: string) {
        this.street = street,
        this.province = province,
        this.city = city
    }
}
export class CreateClinicDto {

    @Length(9, 9, { message: "Register Number  Format not valid" })
    @IsNotEmpty({ message: "Register Number is required" })
    public registerNumber: string;

    
    @IsString({ message: "Name should contain only letters" })
    @IsNotEmpty({ message: "Name is required" })
    public name: string;


    @IsPhoneNumber("SV", { message: "Phone Number not valid" })
    @IsNotEmpty({ message: "Phone Number is required" })
    public phone: string;

        
    @IsObject()
    @ValidateNested()
    @Type(() => Address)
    public address: Address

    @IsMongoId()
    public readonly createdBy: string


    constructor(args: CreateClinicDtoArgs) {
        const {
            registerNumber,
            name,
            phone,
            address,
            createdBy
        } = args;
        
        this.registerNumber = registerNumber,
        this.name = name,
        this.phone = phone,
        this.address = new Address(address.city, address.province, address.street),
        this.createdBy = createdBy
    }

    static create(object: CreateClinicDtoArgs): [ undefined | {[key: string]: string}, CreateClinicDto?] {
        const createClinicDto = new CreateClinicDto(object);

        const errors = validateSync(createClinicDto);

        if (errors.length > 0) {
        return [errors[0].constraints];
        }

        return [undefined, createClinicDto];
    }
}