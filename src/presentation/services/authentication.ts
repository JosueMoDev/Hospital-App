import { AuthenticatedUserEntity, LoginDto } from "../../domain";
import { AuthenticationRepository } from "../../domain";

export class AuthenticationService {

  constructor(private readonly repository: AuthenticationRepository) {}
  
  public async athenticatingWithEmailAndPassord(
    loginDto: LoginDto
  ): Promise<AuthenticatedUserEntity> {
    return await this.repository.loginWithEmailAndPassword(loginDto);
  }
}
