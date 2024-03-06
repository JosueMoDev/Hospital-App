import { AuthenticatedUserEntity, LoginDto } from "../../domain";
import { AuthenticationRepository } from "../../domain";

export class AuthenticationService {

  constructor(private readonly repository: AuthenticationRepository) { }

  public async athenticatingWithEmailAndPassord(
    loginDto: LoginDto
  ): Promise<AuthenticatedUserEntity> {
    return await this.repository.loginWithEmailAndPassword(loginDto);
  }

  public async authenticationWithGoogle(token: string): Promise<AuthenticatedUserEntity> {
    return await this.repository.loginWithGoogle(token);
  }

  public async refreshToken(accessToken: string): Promise<AuthenticatedUserEntity> {
    return await this.repository.refreshToken(accessToken);
  }
}
