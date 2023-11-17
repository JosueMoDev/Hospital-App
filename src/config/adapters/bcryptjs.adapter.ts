import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export class BcryptAdapter {

    static hashPassword(password: string): string {
        const salt = genSaltSync();
        return hashSync(password, salt);
    }

    static comparePassword(password: string, hashed: string): boolean {
        return compareSync(password, hashed);
    }
}