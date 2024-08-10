import { AuthenticationDataSource } from '@domain/datasources';
import { LoginDto } from '@domain/dtos';
import { AuthenticatedUserEntity } from '@domain/entities';
import { AuthenticationRepository } from '@domain/repositories';

export class AuthenticationRepositoryImpl implements AuthenticationRepository {
  constructor(private readonly datasource: AuthenticationDataSource) {}

  loginWithEmailAndPassword(
    loginDto: LoginDto,
  ): Promise<AuthenticatedUserEntity> {
    return this.datasource.loginWithEmailAndPassword(loginDto);
  }
  loginWithGoogle(tokenId: string): Promise<AuthenticatedUserEntity> {
    return this.datasource.loginWithGoogle(tokenId);
  }
  refreshToken(token: string): Promise<AuthenticatedUserEntity> {
    return this.datasource.refreshToken(token);
  }
}
