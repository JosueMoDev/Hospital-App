import { Router } from "express";
import { ClinicAssignmentDataSourceImpl, ClinicAssignmentRepositoryImpl } from '../../../infraestructure';
import { ClinicAssignmentController } from "./clinicAssignment.controller";

export class ClinicAssignmentRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ClinicAssignmentDataSourceImpl();
        const repository = new ClinicAssignmentRepositoryImpl(datasource);
        const controller = new ClinicAssignmentController(repository);

        router.get("/assignable-doctors", controller.getAssignableDoctors);
        router.get("/assigned-doctors/:clinic", controller.getAssignedDoctors);
        router.post('/create', controller.createClinicAssignment);
        router.post('/update', controller.updateClinicAssignment);
        router.delete('/delete', controller.deleteClinicAssignment);

        return router;
    }
}