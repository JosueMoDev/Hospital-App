import { Router } from "express"
import { ClinicDataSourceImpl, ClinicRepositoyImpl } from '../../../infraestructure';
import { ClinicService } from "../../services";
import { ClinicController } from "./clinic.controller";

export class ClinicRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new ClinicDataSourceImpl();
        const repository = new ClinicRepositoyImpl(datasource);
        const clinicService = new ClinicService(repository);
        const controller = new ClinicController(clinicService);

        router.post('/create', controller.createClinic);
        router.patch('/update', controller.updateClinic)

        return router;
    }
    
}