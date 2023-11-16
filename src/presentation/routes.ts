import { Router } from "express";
import { AccountRoutes, AppointmentRoutes, AuthenticationRoutes } from "./app";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use('/api/authentication', AuthenticationRoutes.routes);
        router.use('/api/account', AccountRoutes.routes);
        router.use('/api/appointment', AppointmentRoutes.routes);

        return router;
    }
}