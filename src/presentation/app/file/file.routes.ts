import { Router } from "express";
import { FileDataSourceImpl } from "../../../infraestructure/datasources/file.datasource.impl";
import { FileRepositoryImpl } from "../../../infraestructure/repositories/file.repository.impl";
import { FileService } from "../../services";
import { FileController } from "./file.controller";
import { FileUploadMiddleware } from "../../middlewares";

export class FileRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new FileDataSourceImpl();
        const repository = new FileRepositoryImpl(datasource);
        const fileService = new FileService(repository);
        const controller = new FileController(fileService);

        router.use(FileUploadMiddleware.containFiles);
        router.post('/photo', controller.uploadPhoto);

        return router;

    }

}