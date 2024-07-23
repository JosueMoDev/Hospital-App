import { Router } from "express";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationDataSourceImpl, AuthenticationRepositoryImpl } from '../../../infraestructure';

export class AuthenticationRoutes {
    static get routes(): Router {
      const router = Router();

      const datasource = new AuthenticationDataSourceImpl();
      const repository = new AuthenticationRepositoryImpl(datasource);
      const controller = new AuthenticationController(repository);

      router.post("/login", controller.loginWithEmailAndPassword);
      router.post("/google-sign-in", controller.googleSignIn);
      router.get("/refresh-token", controller.refreshToken);

      return router;
    }
}