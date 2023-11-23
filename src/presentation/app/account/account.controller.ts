import { Request, Response } from "express";
import { AccountService } from "../../services";
import {
  CreateAccountDto,
  HandlerError,
  PaginationDto,
  UpdateAccountDto,
  UpdatePasswordDto,
} from "../../../domain";

export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  createAccount = (request: Request, response: Response) => {
    const [error, createAccountDto] = CreateAccountDto.create(request.body);
    if (error) return response.status(400).json({ error });

    this.accountService
      .creatingAccount(createAccountDto!)
      .then((account) => response.json(account))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  updateAccount = (request: Request, response: Response) => {
    const [error, updateAccountDto] = UpdateAccountDto.update(request.body);
    if (error) return response.status(400).json({ error });

    this.accountService
      .updatingAccount(updateAccountDto!)
      .then((updatedAccount) => response.json(updatedAccount))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  findAccountById = (request: Request, response: Response) => {
    this.accountService
      .findingAccountById(request.params.id)
      .then((account) => response.json(account))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  findManyAccounts = (request: Request, response: Response) => {
    const [error, pagDto] = PaginationDto.create(request.query);
    if (error) return response.status(400).json({ error });

    this.accountService
      .findingManyAccounts(pagDto!)
      .then((accounts) => response.json(accounts))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  changePassowordAccount = (request: Request, response: Response) => {
    const [error, passwordDto] = UpdatePasswordDto.update(request.body);
    if (error) return response.status(400).json({ error });

    this.accountService
      .changingPasswordAccoun(passwordDto!)
      .then((result) => response.json(result))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  changeAccountStatus = (request: Request, response: Response) => {
    const [error, accountDto] = UpdateAccountDto.update(request.body);
    if (error) return response.status(400).json({ error });

    this.accountService
      .changingStatusAccount(accountDto!)
      .then((account) => response.json(account))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  confirmPassword = (request: Request, response: Response) => {
    if (!request.params.id && request.body.password) return response.status(400).json({ error: "missing id or password" });

    this.accountService
      .checkingPassword(request.body, request.params.id)
      .then((result) => response.json(result))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };
}
