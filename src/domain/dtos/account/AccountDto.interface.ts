import { Gender, Role } from "../../entities";

export interface CreateAccountDtoArgs {
    duiNumber: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
    gender: Gender;
    phone: string;
    isValidated?: boolean;
    role: Role;
}

