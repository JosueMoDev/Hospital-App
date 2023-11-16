import { LoginDto } from '../dtos';
import { AuthenticatedUserEntity } from '../entities';
export abstract class AuthenticationDataSource {

    abstract loginWithEmailAndPassword(loginDto: LoginDto): Promise<AuthenticatedUserEntity>;

    abstract loginWithGoogle(email:string): Promise<AuthenticatedUserEntity>;

    abstract refreshToken(token: any): Promise<AuthenticatedUserEntity>;

}