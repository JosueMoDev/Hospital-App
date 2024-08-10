import {
  prisma,
  BcryptAdapter,
  JWTAdapter,
  GoogleOAuth2ClientAdapter,
} from '@config';
import { AuthenticationDataSource } from '@domain/datasources';
import { LoginDto } from '@domain/dtos';
import { AccountEntity, AuthenticatedUserEntity } from '@domain/entities';
import { CustomError } from '@handler-errors';

export class AuthenticationDataSourceImpl implements AuthenticationDataSource {
  private async findAccountByEmail(email: string): Promise<AccountEntity> {
    const account = await prisma.account.findFirst({
      where: {
        email: email,
      },
    });

    if (!account) throw CustomError.badRequest('Any user found');

    return AccountEntity.fromObject(account);
  }

  private async findAccountById(id: string): Promise<AccountEntity> {
    const account = await prisma.account.findFirst({
      where: {
        id: id,
      },
    });

    if (!account) throw CustomError.badRequest('Any user found');

    return AccountEntity.fromObject(account);
  }

  async loginWithEmailAndPassword(
    loginDto: LoginDto,
  ): Promise<AuthenticatedUserEntity> {
    const account = await this.findAccountByEmail(loginDto.email);

    const isPasswordMatching = BcryptAdapter.comparePassword(
      loginDto.password,
      account.password,
    );
    if (!isPasswordMatching) throw CustomError.badRequest('Wrong credentials');

    const { password, ...authenticatedAccount } =
      AccountEntity.fromObject(account);
    const token = await JWTAdapter.generateToken({ id: account.id });

    if (!token) throw CustomError.internalServer('Error while creating token');

    return {
      account: authenticatedAccount,
      accessToken: token,
      refreshToken: '',
    };
  }

  async loginWithGoogle(token: string): Promise<AuthenticatedUserEntity> {
    const result = await GoogleOAuth2ClientAdapter.verify(token);
    const { email }: any = result;
    if (!email) throw CustomError.internalServer('no email');
    const account = await this.findAccountByEmail(email);

    const accesstoken = await JWTAdapter.generateToken({ id: account.id });

    if (!accesstoken)
      throw CustomError.internalServer('Error while creating token');

    return {
      account: account,
      accessToken: accesstoken,
      refreshToken: '',
    };
  }

  async refreshToken(token: string): Promise<AuthenticatedUserEntity> {
    const isValidToken: any = await JWTAdapter.validateToken(token);

    if (!isValidToken) throw CustomError.badRequest('Token not valid');

    const account = await this.findAccountById(isValidToken.id);

    const { password, ...authenticatedAccount } =
      AccountEntity.fromObject(account);

    const accesstoken = await JWTAdapter.generateToken({ id: account.id });

    if (!accesstoken)
      throw CustomError.internalServer('Error while creating token');

    return {
      account: authenticatedAccount,
      accessToken: accesstoken,
      refreshToken: '',
    };
  }
}
