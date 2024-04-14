import { Router } from "express";
import { ClinicAssignmentDataSourceImpl, ClinicAssignmentRepositoryImpl } from '../../../infraestructure';
import { ClinicAssignmentService } from "../../services";
import { ClinicAssignmentController } from "./clinicAssignment.controller";

export class ClinicAssignmentRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ClinicAssignmentDataSourceImpl();
        const repository = new ClinicAssignmentRepositoryImpl(datasource);
        const clinicAssignmentService = new ClinicAssignmentService(repository);
        const controller = new ClinicAssignmentController(clinicAssignmentService);

        router.get("/assignable-doctors", controller.getAssignableDoctors);
        router.get("/assigned-doctors/:clinic", controller.getAssignedDoctors);
        router.post('/create', controller.createClinicAssignment);
        router.post('/update', controller.updateClinicAssignment);
        router.post('/delete', controller.deleteClinicAssignment);

        return router;
    }
}