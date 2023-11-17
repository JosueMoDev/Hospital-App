import { Router } from "express";
import { RecordDataSourceImpl } from "../../../infraestructure/datasources/record.datasource.impl";
import { RecordRepositoryImpl } from "../../../infraestructure/repositories/record.repository.impl";
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

        return router;
    }
}