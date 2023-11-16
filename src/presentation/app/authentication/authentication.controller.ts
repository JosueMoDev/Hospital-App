import { Response, Request } from "express";
import { HandlerError, LoginDto } from "../../../domain";
import { AuthenticationService } from "../../services";

export class AuthenticationController {
  constructor(public readonly authService: AuthenticationService) {}

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

  googleSignIn = (request: Request, response: Response) => {};
}
