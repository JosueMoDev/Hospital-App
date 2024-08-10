import { LoginDto } from '../dtos';
import { AuthenticatedUserEntity } from '../entities';
export abstract class AuthenticationDataSource {
  abstract loginWithEmailAndPassword(
    loginDto: LoginDto,
  ): Promise<AuthenticatedUserEntity>;

  abstract loginWithGoogle(tokenId: string): Promise<AuthenticatedUserEntity>;

  abstract refreshToken(token: string): Promise<AuthenticatedUserEntity>;
}
