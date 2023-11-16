import { Router } from "express";
import { AuthenticationRoutes } from "./app";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use('/api/authentication', AuthenticationRoutes.routes);
        return router;
    }
}