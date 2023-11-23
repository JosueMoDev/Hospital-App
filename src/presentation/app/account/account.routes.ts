import { Router } from "express";
import { AccountDataSourceImpl, AccountRepositoryImpl } from "../../../infraestructure";
import { AccountService } from "../../services";
import { AccountController } from "./account.controller";

export class AccountRoutes {
    static get routes(): Router {

        const router = Router();

        const datasource = new AccountDataSourceImpl();
        const repository = new AccountRepositoryImpl(datasource);
        const accountService = new AccountService(repository);
        const controller = new AccountController(accountService);

        router.post('/create', controller.createAccount);
        router.patch('/update', controller.updateAccount);
        router.get('/find-one/:id', controller.findAccountById);
        router.get('/find-many', controller.findManyAccounts);
        router.patch('/change-status', controller.changeAccountStatus);
        router.patch('/change-password', controller.changePassowordAccount);
        router.get('/confirm-password/:id', controller.confirmPassword);

        return router;
    }
}