import { LoginDto } from '@domain/dtos';
import { AuthenticationRepository } from '@domain/repositories';
import { LoginWithEmailAndPassword, LoginWithGoogle, RefreshToken } from '@domain/use-cases';
import { HandlerError } from '@handler-errors';
import { Response, Request } from 'express';


export class AuthenticationController {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}

  loginWithEmailAndPassword = (request: Request, response: Response) => {
    const [error, loginDto] = LoginDto.create(request.body);
    if (error) return response.status(400).json({ error });

    new LoginWithEmailAndPassword(this.authenticationRepository)
      .execute(loginDto!)
      .then((account) => response.json(account))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  googleSignIn = (request: Request, response: Response) => {
    const token = request.body.token;
    if (!token)
      return response.status(400).json({ error: ' NO token provided' });
    new LoginWithGoogle(this.authenticationRepository)
      .execute(token)
      .then((account) => response.json(account))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  refreshToken = (request: Request, response: Response) => {
    const bearerToken = request.headers['authorization'];
    if (!bearerToken)
      return response.status(400).json({ error: ' NO token provided' });
    const accessToken = bearerToken.split(' ');
    new RefreshToken(this.authenticationRepository)
      .execute(accessToken[1])
      .then((account) => response.json(account))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };
}
