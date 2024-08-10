import { Router } from 'express';
import {
  AppointmentDataSourceImpl,
  AppointmentRepositoryImpl,
} from '../../../infraestructure';
import { AppointmentController } from './appointment.controller';

export class AppointmentRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AppointmentDataSourceImpl();
    const repository = new AppointmentRepositoryImpl(datasource);
    const controller = new AppointmentController(repository);

    router.post('/create', controller.createAppointment);
    router.patch('/update', controller.updateAppointment);
    router.get('/find-one/:id', controller.findOneById);
    router.get('/find-many', controller.findMany);
    router.delete('/delete/:id', controller.deleteAppointment);

    return router;
  }
}
