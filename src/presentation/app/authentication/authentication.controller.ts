import { Response, Request } from "express";
import { HandlerError, LoginDto } from "../../../domain";
import { AuthenticationService } from "../../services";

export class AuthenticationController {


    constructor(
        public readonly authService: AuthenticationService
    ) { }
    
    loginWithEmailAndPassword = (request: Request, respose: Response) => {
        const [error, loginDto] = LoginDto.create(request.body);
        if (error) return respose.status(400).json({ error });

        this.authService.login(loginDto!)
            .then((account) => respose.json(account))
            .catch((error) => {
                const { statusCode, errorMessage } = HandlerError.hasError(error);
                return respose.status(statusCode).json({ error: errorMessage });
            });



    }

    googleSignIn = (request: Request, response: Response) => {
        
    }
    
}