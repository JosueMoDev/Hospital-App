import { Router } from "express";
import { AppointmentDataSourceImpl, AppointmentRepositoryImpl } from "../../../infraestructure";
import { AppointmentService } from "../../services";
import { AppointmentController } from './appointment.controller';

export class AppointmentRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new AppointmentDataSourceImpl();
        const repository = new AppointmentRepositoryImpl(datasource);
        const appointmentService = new AppointmentService(repository);
        const controller = new AppointmentController(appointmentService);

        router.post('/create', controller.createAppointment);
        router.patch('/update', controller.updateAppointment)

        return router;
    }
    
}