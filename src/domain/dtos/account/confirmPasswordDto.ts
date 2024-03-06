import { CustomErrors, CustomValidationErrors } from "../utils";
import {
    IsMongoId,
    IsNotEmpty,
    MinLength,
} from "class-validator";

interface ConfirmPasswordDtoArgs {
    id: string;
    password: string;
}

export class ConfirmPasswordDto {
    @IsMongoId()
    @IsNotEmpty({ message: "Id is required" })
    public id!: string;

    @IsNotEmpty()
    @MinLength(8, { message: "Password should be at least 8 characters long" })
    public password!: string;

    constructor(args: ConfirmPasswordDto) {
        this.id = args.id;
        this.password = args.password;
    }
    static update(
        object: ConfirmPasswordDtoArgs
    ): [undefined | CustomErrors[], ConfirmPasswordDto?] {
        const updateAccountDto = new ConfirmPasswordDto(object);

        const [errors, validatedDto] =
            CustomValidationErrors.validateDto<ConfirmPasswordDto>(updateAccountDto);

        if (errors) return [errors];

        return [undefined, validatedDto];
    }
}