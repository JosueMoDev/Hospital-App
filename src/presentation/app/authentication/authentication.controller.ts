import { Response, Request } from "express";
import { HandlerError, LoginDto } from "../../../domain";
import { AuthenticationService } from "../../services";

export class AuthenticationController {
  constructor(public readonly authService: AuthenticationService) { }

  loginWithEmailAndPassword = (request: Request, response: Response) => {
    const [error, loginDto] = LoginDto.create(request.body);
    if (error) return response.status(400).json({ error });

    this.authService
      .athenticatingWithEmailAndPassord(loginDto!)
      .then((account) => response.json(account))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  googleSignIn = (request: Request, response: Response) => {
    const token = request.body.token;
    if (!token) return response.status(400).json({ error: " NO token provided" });
    this.authService
      .authenticationWithGoogle(token)
      .then((account) => response.json(account))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  refreshToken = (request: Request, response: Response) => {
    const bearerToken = request.headers['authorization'];
    if (!bearerToken) return response.status(400).json({ error: " NO token provided" });
    const accessToken = bearerToken.split(' ');
    console.log(accessToken[1])
    this.authService
      .authenticationWithGoogle(accessToken[1])
      .then((account) => response.json(account))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };
}
