import { Role } from './account.entity';
export interface AuthenticatedUserOptions {
   id: string,
   email: string,
   name: string,
   lastname: string,
   duiNumber: string,
   role: Role
   accessToken: string,
   refreshToken: string,
}

export class AuthenticatedUserEntity {
    public id: string;
    public email: string;
    public name: string;
    public lastname: string;
    public duiNumber: string;
    public role: Role;
    public accessToken: string;
    public refreshToken: string;
    constructor(options: AuthenticatedUserOptions){

        const {
          id,
          email,
          name,
          lastname,
          duiNumber,
          role,
          accessToken,
          refreshToken,
        } = options;

        this.id = id;
        this.email = email;
        this.name = name;
        this.lastname = lastname;
        this.duiNumber = duiNumber;
        this.role = role;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    static fromObject(object: {[key:string]: any}): AuthenticatedUserEntity{
        const {
          id,
          email,
          name,
          lastname,
          duiNumber,
          role,
          accessToken,
          refreshToken,
        } = object;

        const authenticatedUser = new AuthenticatedUserEntity({
          id,
          email,
          name,
          lastname,
          duiNumber,
          role,
          accessToken,
          refreshToken,
        });

        return authenticatedUser;
    }
}