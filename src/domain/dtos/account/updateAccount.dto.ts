import { Gender, Role } from "../../entities";
import { CreateAccountDtoArgs, ErrorDefinition } from "./AccountDto.interface";
import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Length,
    MinLength,
    ValidationError,
    validateSync,
} from "class-validator";

interface UpdateAccountDtoArgs extends CreateAccountDtoArgs {
    id: string;
}

export class UpdateAccountDto {
    @IsMongoId()
    @IsNotEmpty({ message: "Id is required" })
    public id!: string;

    @IsOptional()
    @Length(9, 9, { message: "DUI Format not valid" })
    public duiNumber!: string;

    @IsOptional()
    @IsEmail({}, { message: "Email is not valid" })
    public email!: string;

    @IsOptional()
    @MinLength(8, { message: "Password should be at least 8 characters long" })
    public password!: string;

    @IsOptional()
    @IsString({ message: "Name should contain only letters" })
    public name!: string;

    @IsOptional()
    @IsString({ message: "Lastame should contain only letters" })
    public lastname!: string;

    @IsOptional()
    @IsEnum(Gender, { message: "Gender is not valid" })
    public gender!: Gender;
    @IsOptional()
    @IsPhoneNumber("SV", { message: "Phone Number not valid" })
    public phone!: string;

    @IsOptional()
    @IsBoolean()
    public isValidated!: boolean;
    @IsOptional()

    @IsEnum(Role, { message: "Role is not valid" })
    public role!: Role;

    constructor(args: UpdateAccountDtoArgs) {
        Object.assign(this, args);
    }
    static update(
        object: UpdateAccountDtoArgs
    ): [undefined | ErrorDefinition[], UpdateAccountDto?] {
        const updateAccountDto = new UpdateAccountDto(object);
        const [errors, validatedDto] =
            UpdateAccountDto.validateDto(updateAccountDto);
        if (errors) {
            return [errors];
        }

        return [undefined, validatedDto];
    }

    private static validateDto(
        dto: UpdateAccountDto
    ): [undefined | ErrorDefinition[], UpdateAccountDto?] {
        const errors = validateSync(dto);
        if (errors !== undefined && errors.length > 0) {
            const errorsMapped = errors.map(
                (error: ValidationError): ErrorDefinition => ({
                    errorOnProperty: error.property,
                    errorMessages: error.constraints!,
                })
            );
            return [errorsMapped];
        }
        return [undefined, dto];
    }
}
