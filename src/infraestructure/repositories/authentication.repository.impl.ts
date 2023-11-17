import { AuthenticatedUserEntity, AuthenticationDataSource, AuthenticationRepository, LoginDto } from "../../domain";

export class AuthenticationRepositoryImpl implements AuthenticationRepository {

    constructor( private readonly datasource: AuthenticationDataSource){}

    loginWithEmailAndPassword(loginDto: LoginDto): Promise<AuthenticatedUserEntity> {
        return this.datasource.loginWithEmailAndPassword(loginDto);
    }
    loginWithGoogle(email: string): Promise<AuthenticatedUserEntity> {
        throw new Error("Method not implemented.");
    }
    refreshToken(token: string): Promise<AuthenticatedUserEntity> {
        throw new Error("Method not implemented.");
    }

}