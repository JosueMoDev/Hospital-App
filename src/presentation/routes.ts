import { Router } from 'express';
import {
  AccountRoutes,
  AppointmentRoutes,
  AuthenticationRoutes,
  ClinicAssignmentRoutes,
  ClinicRoutes,
  RecordRoutes,
} from '@app';
import { AuthenticationMiddleware } from '@middlewares';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/authentication', AuthenticationRoutes.routes);
    router.use(AuthenticationMiddleware.validateAccessToken);
    router.use('/account', AccountRoutes.routes);
    router.use('/appointment', AppointmentRoutes.routes);
    router.use('/clinic-assignment', ClinicAssignmentRoutes.routes);
    router.use('/clinic', ClinicRoutes.routes);
    router.use('/record', RecordRoutes.routes);

    return router;
  }
}
