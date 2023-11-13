import { IsEmail, IsNotEmpty, MinLength,  validateSync } from "class-validator";
interface LoginDtoOptions {
    email: string ,
    password: string
}
export class LoginDto {
    @IsEmail({}, {message: 'Email is not valid'})
    @IsNotEmpty({message: 'Email is required'})
    public email: string;

    @MinLength(8, { message: 'Password should be at least 8 characters long' })
    @IsNotEmpty({ message: 'Password is required' })
    public password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    static create(object: LoginDtoOptions): [string?, LoginDto?] {
        const { email, password } = object;
        
        const loginDto = new LoginDto(email, password);

        const errors = validateSync(loginDto);

        if (errors.length > 0) {
            return [errors[0].toString()];
        }

        return [undefined, loginDto];

    }
}