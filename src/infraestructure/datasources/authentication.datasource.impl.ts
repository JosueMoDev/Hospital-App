import { BcryptAdapter, JWTAdapter, prisma } from "../../config";
import { AuthenticationDataSource, AuthenticatedUserEntity, LoginDto, CustomError, AccountEntity } from "../../domain";

export class AuthenticationDataSourceImpl implements AuthenticationDataSource {

    async loginWithEmailAndPassword(loginDto: LoginDto): Promise<AuthenticatedUserEntity> {
        const account = await prisma.account.findFirst({
            where: {
                email: loginDto.email
            }
        });

        if (!account) throw CustomError.badRequest('Any user found');

     
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

    async loginWithGoogle(email: string): Promise<AuthenticatedUserEntity> {
        throw new Error("Method not implemented.");
    }

    async refreshToken(token: any): Promise<AuthenticatedUserEntity> {
        throw new Error("Method not implemented.");
    }
    
}