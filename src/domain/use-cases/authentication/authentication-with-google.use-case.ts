import {
  AuthenticatedUserEntity,
  AuthenticationRepository,
} from "../../../domain";

interface LoginWithGoogleUseCase {
  execute(token: string): Promise<AuthenticatedUserEntity>;
}

export class LoginWithGoogle implements LoginWithGoogleUseCase {
  constructor(
    private readonly authenticationResository: AuthenticationRepository
  ) {}

  async execute(token: string): Promise<AuthenticatedUserEntity> {
    return await this.authenticationResository.loginWithGoogle(token);
  }
}
