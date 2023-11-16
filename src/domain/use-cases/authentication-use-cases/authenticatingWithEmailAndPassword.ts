import { LoginDto } from "../../dtos";
import { AuthenticatedUserEntity } from "../../entities";
import { AuthenticationRepository } from '../../../domain'

export interface AuthenticatingWithEmailAndPasswordUseCase {
    execute(dto: LoginDto): Promise<AuthenticatedUserEntity>
}

export class AuthenticatingWithEmailAndPassword implements AuthenticatingWithEmailAndPasswordUseCase {

    constructor( private readonly repository: AuthenticationRepository){}

    execute(dto: LoginDto): Promise<AuthenticatedUserEntity> {
        return this.repository.loginWithEmailAndPassword(dto);
    }

}