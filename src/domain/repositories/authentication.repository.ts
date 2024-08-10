import { LoginDto } from '@domain/dtos';
import { AuthenticatedUserEntity } from '@domain/entities';

export abstract class AuthenticationRepository {
  abstract loginWithEmailAndPassword(
    loginDto: LoginDto,
  ): Promise<AuthenticatedUserEntity>;

  abstract loginWithGoogle(tokenId: string): Promise<AuthenticatedUserEntity>;

  abstract refreshToken(token: string): Promise<AuthenticatedUserEntity>;
}
