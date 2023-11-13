import { IsEmail, IsNotEmpty, IsString, MinLength,  validateSync } from "class-validator";
interface RegisterDtoOptions {
    email: string ,
    password: string,
    name: string
}
export class RegisterDto {
    @IsEmail({}, {message: 'Email is not valid'})
    @IsNotEmpty({message: 'Email is required'})
    public email: string;

    @MinLength(8, { message: 'Password should be at least 8 characters long' })
    @IsNotEmpty({ message: 'Password is required' })
    public password: string;

    @IsString({ message: 'Name is not valid' })
    @IsNotEmpty({ message: 'Name is required' })
    public name: string;



    constructor(email: string, password: string, name: string) {
        this.email = email;
        this.password = password;
        this.name = name
    }

    static create(object: RegisterDtoOptions): [string?, RegisterDto?] {
        
        const { email, password, name } = object;
        
        const registerDto = new RegisterDto(email, password, name);

        const errors = validateSync(registerDto);

        if (errors.length > 0) {
            return [errors[0].toString()];
        }

        return [undefined, registerDto];

    }
}