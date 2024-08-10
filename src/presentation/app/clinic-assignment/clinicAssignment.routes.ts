import { ClinicAssignmentDataSourceImpl } from '@infraestructure/datasourcesimpl';
import { ClinicAssignmentRepositoryImpl } from '@infraestructure/repositoriesimpl';
import { Router } from 'express';
import { ClinicAssignmentController } from './clinicAssignment.controller';

export class ClinicAssignmentRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new ClinicAssignmentDataSourceImpl();
    const repository = new ClinicAssignmentRepositoryImpl(datasource);
    const controller = new ClinicAssignmentController(repository);

    router.get('/assignable-doctors', controller.getAssignableDoctors);
    router.get('/assigned-doctors/:clinic', controller.getAssignedDoctors);
    router.post('/create', controller.createClinicAssignment);
    router.post('/update', controller.updateClinicAssignment);
    router.patch('/delete', controller.deleteClinicAssignment);

    return router;
  }
}
