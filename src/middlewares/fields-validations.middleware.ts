import { Response, Request, NextFunction} from "express";
import { validationResult } from "express-validator";

export const fieldsValidation = (req: Request, resp: Response, next: NextFunction) => {
  const validationHasError = validationResult(req);

  if (!validationHasError.isEmpty()) {
    return resp.status(400).json({
      ok: false,
      errors: validationHasError.mapped(),
    });
  }
  next();
};
