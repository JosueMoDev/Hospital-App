import { Router } from "express"
import { ClinicDataSourceImpl } from '../../../infraestructure/datasources/clinic.datasource.impl';
import { ClinicRepositoyImpl } from '../../../infraestructure/repositories/clinic.repository.impl';
import { ClinicService } from "../../services";
import { ClinicController } from "./clinic.controller";

export class ClinicRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new ClinicDataSourceImpl();
        const repository = new ClinicRepositoyImpl(datasource);
        const clinicService = new ClinicService(repository);
        const controller = new ClinicController(clinicService);

        router.post('/create', controller.createClinic)

        return router;
    }
    
}