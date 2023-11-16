import { Router } from "express";
import { AccountDataSourceImpl } from "../../../infraestructure/datasources/account.datasource.impl";
import { AccountRepositoryImpl } from "../../../infraestructure/repositories/account.repository.impl";
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

        return router;
    }
}