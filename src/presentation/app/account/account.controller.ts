import { Request, Response } from "express";
import { AccountService } from "../../services";
import { CreateAccountDto, HandlerError } from "../../../domain";

export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  createAccount = (request: Request, response: Response) => {
    const [error, createAccountDto] = CreateAccountDto.create(request.body);
    if (error) return response.status(400).json({ error });

    this.accountService
      .creatingNewAccount(createAccountDto!)
      .then((account) => response.json(account))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };
}