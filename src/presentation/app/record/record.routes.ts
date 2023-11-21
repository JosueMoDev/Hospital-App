import { Router } from "express";
import { RecordDataSourceImpl, RecordRepositoryImpl } from "../../../infraestructure";
import { RecordService } from "../../services";
import { RecordController } from "./record.controller";

export class RecordRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new RecordDataSourceImpl();
        const repository = new RecordRepositoryImpl(datasource);
        const recordService = new RecordService(repository);
        const controller = new RecordController(recordService);


        router.post('/create', controller.createRecord);
        router.patch('/update', controller.updateRecord);
        router.get('/find-one/:id', controller.findOneById);
        router.get('/find-many', controller.findMany);
        router.get('/hidde/:id', controller.hiddeRecord);

        return router;
    }
}