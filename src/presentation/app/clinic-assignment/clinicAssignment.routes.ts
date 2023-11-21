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

        router.post('/create', controller.createClinicAssignment);
        router.patch('/update', controller.updateClinicAssignment);
        router.delete('/delete', controller.deleteClinicAssignment);

        return router;
    }
}