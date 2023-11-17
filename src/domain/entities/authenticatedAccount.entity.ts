import { Role } from './account.entity';

interface AccountData {
  id: string,
  email: string,
  name: string,
  lastname: string,
  duiNumber: string,
  role: Role
}
interface AuthenticatedUserOptions {
  account: AccountData,
  accessToken: string,
  refreshToken: string,
}

export class AuthenticatedUserEntity {
  public account: AccountData;
    public accessToken: string;
    public refreshToken: string;
    constructor(options: AuthenticatedUserOptions){

        const {
          account,
          accessToken,
          refreshToken,
        } = options;
      

      this.account = account; 
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    }

    static fromObject(object: {[key:string]: any}): AuthenticatedUserEntity{
        const {
          account,
          accessToken,
          refreshToken,
        } = object;

        const authenticatedUser = new AuthenticatedUserEntity({
          account,
          accessToken,
          refreshToken,
        });

        return authenticatedUser;
    }
}