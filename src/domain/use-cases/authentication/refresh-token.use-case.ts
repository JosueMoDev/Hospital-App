import { AuthenticatedUserEntity } from "@domain/entities";
import { AuthenticationRepository } from "@domain/repositories";


interface RefreshTokenUseCase {
  execute(accessToken: string): Promise<AuthenticatedUserEntity>;
}

export class RefreshToken implements RefreshTokenUseCase {
  constructor(
    private readonly authenticationResository: AuthenticationRepository,
  ) {}

  async execute(accessToken: string): Promise<AuthenticatedUserEntity> {
    return await this.authenticationResository.refreshToken(accessToken);
  }
}
