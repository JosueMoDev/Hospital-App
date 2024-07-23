import { Router } from "express";
import { AccountDataSourceImpl, AccountRepositoryImpl } from "../../../infraestructure";
import { AccountController } from "./account.controller";
import { FileUploadMiddleware } from "../../middlewares";

export class AccountRoutes {
    static get routes(): Router {

        const router = Router();

        const datasource = new AccountDataSourceImpl();
        const repository = new AccountRepositoryImpl(datasource);
        const controller = new AccountController(repository);

        router.post('/create', controller.createAccount);
        router.patch('/update', controller.updateAccount);
        router.get('/find-one/:id', controller.findAccountById);
        router.get("/find-by-document/:document", controller.findAccountByDocument);
        router.get('/find-many', controller.findManyAccounts);
        router.patch('/change-status/:id', controller.changeAccountStatus);
        router.patch('/change-password', controller.changePasswordAccount);
        router.post('/confirm-password', controller.confirmPassword);

        router.patch('/delete-photo', controller.deleteFile);
        router.use(FileUploadMiddleware.containFiles);
        router.patch('/upload-photo', controller.uploadFile);

        return router;
    }
}