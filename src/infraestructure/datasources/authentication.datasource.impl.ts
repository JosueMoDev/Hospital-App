import { BcryptAdapter, JWTAdapter, prisma } from "../../config";
import { AuthenticationDataSource, AuthenticatedUserEntity, LoginDto, CustomError, AccountEntity } from "../../domain";
import { GoogleOAuth2ClientAdapter } from '../../config/adapters/googleauth.adapter';

export class AuthenticationDataSourceImpl implements AuthenticationDataSource {

    private async findAccountByEmail(email: string): Promise<AccountEntity> {
        const account = await prisma.account.findFirst({
            where: {
                email: email
            }
        });

        if (!account) throw CustomError.badRequest('Any user found');

        return AccountEntity.fromObject(account);
    }

    async loginWithEmailAndPassword(loginDto: LoginDto): Promise<AuthenticatedUserEntity> {

        const account = await this.findAccountByEmail(loginDto.email);

        const isPasswordMatching = BcryptAdapter.comparePassword(loginDto.password, account.password);
        if (!isPasswordMatching) throw CustomError.badRequest('Wrong credentials');

        const { password, ...authenticatedAccount } = AccountEntity.fromObject(account);
        const token = await JWTAdapter.generateToken({ id: account.id });

        if (!token) throw CustomError.internalServer('Error while creating token');

        return {
            account: authenticatedAccount,
            accessToken: token,
            refreshToken: ''
        }
    }

    async loginWithGoogle(token: string): Promise<AuthenticatedUserEntity> {
        const result = await GoogleOAuth2ClientAdapter.verify(token);
        const { email }: any = result;
        if (!email) throw CustomError.internalServer('no email')
        const account = await this.findAccountByEmail(email);

        const accesstoken = await JWTAdapter.generateToken({ id: account.id });

        if (!accesstoken) throw CustomError.internalServer('Error while creating token');

        return {
            account: account,
            accessToken: accesstoken,
            refreshToken: ''
        }
    }

    async refreshToken(token: any): Promise<AuthenticatedUserEntity> {
        // todo: fix validatetoken
        const result = await JWTAdapter.validateToken(token);
        console.log(result)
        throw 'Token'
    }

}