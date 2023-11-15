import { AuthenticatedUserEntity } from '../entities';
export abstract class AuthenticatedUserDataSource {

    abstract loginWithEmailAndPassword(email: string, password: string): Promise<AuthenticatedUserEntity>;

    abstract loginWithGoogle(email:string): Promise<AuthenticatedUserEntity>;

    abstract refreshToken(token: any): Promise<AuthenticatedUserEntity>;

}