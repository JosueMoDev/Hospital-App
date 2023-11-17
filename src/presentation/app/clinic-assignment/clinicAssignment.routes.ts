import { Router } from "express";
import { ClinicAssignmentDataSourceImpl } from '../../../infraestructure/datasources/clinicAssignment.datasource.impl';
import { ClinicAssignmentRepositoryImpl } from "../../../infraestructure/repositories/assignment.repository.impl";
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
        return router;
    }
}