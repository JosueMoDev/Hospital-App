import { Router } from "express";
import { AuthenticationService } from "../../services";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationDataSourceImpl, AuthenticationRepositoryImpl } from '../../../infraestructure';

export class AuthenticationRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AuthenticationDataSourceImpl();
        const repository = new AuthenticationRepositoryImpl(datasource);
        const authService = new AuthenticationService(repository);
        const controller = new AuthenticationController(authService);

        router.post('/login', controller.loginWithEmailAndPassword);
        router.post('/google-sign-in', controller.googleSignIn);

        return router;
    }
}