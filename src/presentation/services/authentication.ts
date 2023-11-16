import { LoginDto } from "../../domain";
import { AuthenticatingWithEmailAndPassword } from '../../domain';
import { AuthenticationRepository } from '../../domain';

export class AuthenticationService {
    constructor( private readonly repository: AuthenticationRepository) {}
    public async login(loginDto: LoginDto) {
        
        return await this.repository.loginWithEmailAndPassword(loginDto);
        
    }
}