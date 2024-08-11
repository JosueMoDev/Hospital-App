import { AuthenticatedUserEntity } from "@domain/entities";
import { AuthenticationRepository } from "@domain/repositories";


interface LoginWithGoogleUseCase {
  execute(token: string): Promise<AuthenticatedUserEntity>;
}

export class LoginWithGoogle implements LoginWithGoogleUseCase {
  constructor(
    private readonly authenticationResository: AuthenticationRepository,
  ) {}

  async execute(token: string): Promise<AuthenticatedUserEntity> {
    return await this.authenticationResository.loginWithGoogle(token);
  }
}
