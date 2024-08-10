import { ClinicDataSourceImpl } from '@infraestructure/datasourcesimpl';
import { ClinicRepositoyImpl } from '@infraestructure/repositoriesimpl';
import { FileUploadMiddleware } from '@middlewares';
import { Router } from 'express';
import { ClinicController } from './clinic.controller';

export class ClinicRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new ClinicDataSourceImpl();
    const repository = new ClinicRepositoyImpl(datasource);
    const controller = new ClinicController(repository);

    router.post('/create', controller.createClinic);
    router.patch('/update', controller.updateClinic);
    router.get('/find-one/:id', controller.findOneById);
    router.get('/find-many', controller.findMany);
    router.patch('/change-status', controller.changeStatus);

    router.patch('/delete-photo', controller.deleteFile);
    router.use(FileUploadMiddleware.containFiles);
    router.patch('/upload-photo', controller.uploadFile);

    return router;
  }
}
