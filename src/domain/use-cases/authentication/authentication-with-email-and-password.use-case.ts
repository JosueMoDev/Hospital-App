import { LoginDto } from "@domain/dtos";
import { AuthenticatedUserEntity } from "@domain/entities";
import { AuthenticationRepository } from "@domain/repositories";


interface LoginWithEmailAndPasswordUseCase {
  execute(loginDto: LoginDto): Promise<AuthenticatedUserEntity>;
}

export class LoginWithEmailAndPassword
  implements LoginWithEmailAndPasswordUseCase
{
  constructor(
    private readonly authenticationResository: AuthenticationRepository,
  ) {}

  async execute(loginDto: LoginDto): Promise<AuthenticatedUserEntity> {
    return await this.authenticationResository.loginWithEmailAndPassword(
      loginDto,
    );
  }
}
