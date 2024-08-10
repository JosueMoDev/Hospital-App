import { Request, Response } from 'express';
import {
  CreateAccountDto,
  HandlerError,
  PaginationDto,
  UpdateAccountDto,
  ConfirmPasswordDto,
  ChangePasswordDto,
  UploadDto,
  CreateAccount,
  AccountRepository,
  UpdateAccount,
  FindAccountById,
  FindAccountByDocument,
  FindManyAccounts,
  ChangeAccountPassword,
  ChangeAccountStatus,
  CheckPassword,
  UploadPhoto,
  DeletePhoto,
} from '../../../domain';
import { UploadedFile } from 'express-fileupload';

export class AccountController {
  constructor(private readonly accountRepository: AccountRepository) {}

  createAccount = (request: Request, response: Response) => {
    const [error, createAccountDto] = CreateAccountDto.create(request.body);
    if (error) return response.status(400).json({ error });

    new CreateAccount(this.accountRepository)
      .execute(createAccountDto!)
      .then((account) => response.json(account))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  updateAccount = (request: Request, response: Response) => {
    const [error, updateAccountDto] = UpdateAccountDto.update(request.body);
    if (error) return response.status(400).json({ error });

    new UpdateAccount(this.accountRepository)
      .execute(updateAccountDto!)
      .then((updatedAccount) => response.json(updatedAccount))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  findAccountById = (request: Request, response: Response) => {
    new FindAccountById(this.accountRepository)
      .execute(request.params.id)
      .then((account) => response.json(account))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  findAccountByDocument = (request: Request, response: Response) => {
    new FindAccountByDocument(this.accountRepository)
      .execute(request.params.document)
      .then((account) => response.json(account))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  findManyAccounts = (request: Request, response: Response) => {
    const [error, pagDto] = PaginationDto.create(
      request.query,
      request.originalUrl,
    );
    if (error) return response.status(400).json({ error });

    new FindManyAccounts(this.accountRepository)
      .execute(pagDto!)
      .then((accounts) => response.json(accounts))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  changePasswordAccount = (request: Request, response: Response) => {
    const [error, passwordDto] = ChangePasswordDto.update(request.body);
    if (error) return response.status(400).json({ error });

    new ChangeAccountPassword(this.accountRepository)
      .execute(passwordDto!)
      .then(() => response.json({ message: 'Password has been changed' }))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  changeAccountStatus = (request: Request, response: Response) => {
    new ChangeAccountStatus(this.accountRepository)
      .execute(request.params.id!)
      .then(() => response.json({ message: 'Account status has been changed' }))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  confirmPassword = (request: Request, response: Response) => {
    const [error, accountDto] = ConfirmPasswordDto.update(request.body);
    if (error) return response.status(400).json({ error });

    new CheckPassword(this.accountRepository)
      .execute(accountDto!)
      .then((result) => response.json(result))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  uploadFile = (request: Request, response: Response) => {
    const [error, fileDto] = UploadDto.update(request.body);
    if (error) return response.status(400).json({ error });
    const file = request.body.files.at(0) as UploadedFile;
    new UploadPhoto(this.accountRepository)
      .execute(fileDto!, file)
      .then(() => response.json({ message: 'Photo has been uploaded' }))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  deleteFile = (request: Request, response: Response) => {
    const [error, fileDto] = UploadDto.update(request.body);
    if (error) return response.status(400).json({ error });
    new DeletePhoto(this.accountRepository)
      .execute(fileDto!)
      .then(() => response.json({ message: 'Photo has been deleted' }))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };
}
