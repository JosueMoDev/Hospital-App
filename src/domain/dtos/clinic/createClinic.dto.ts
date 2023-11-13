import { Type } from "class-transformer";
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
  validateSync,
  
} from "class-validator";


interface CreateClinicDtoOptions {
    registerNumber: number,
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
  @IsNumber()
  @IsPositive()
  @Length(9, 9, { message: "Register Number  Format not valid" })
    @IsNotEmpty({ message: "Register Number is required" })
    public registerNumber: number;

    
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
    public createdBy: string


    constructor(args: CreateClinicDto) {
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
        this.address = address,
        this.createdBy = createdBy
        
        

    }

    static create(object: CreateClinicDtoOptions): [string?, CreateClinicDto?] {
        const createClinicDto = new CreateClinicDto(object);

        const errors = validateSync(createClinicDto);

        if (errors.length > 0) {
        return [errors[0].toString()];
        }

        return [undefined, createClinicDto];
    }
}