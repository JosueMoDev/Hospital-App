import { Request, Response } from "express";
import { AccountService } from "../../services";
import { CreateAccountDto, HandlerError, UpdateAccountDto } from "../../../domain";

export class AccountController {
  constructor(private readonly accountService: AccountService) {}

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
    this.accountService.getAccountById(request.params.id)
    .then((account)=> response.json(account))
    .catch((error)=>{
      const { statusCode, errorMessage } = HandlerError.hasError(error);
      return response.status(statusCode).json({ error: errorMessage });
    });
  }
}
