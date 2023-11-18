import { Request, Response } from "express";
import { ClinicService } from "../../services";
import {
  UpdateClinicDto,
  HandlerError,
  CreateClinicDto,
} from "../../../domain";

export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  createClinic = (request: Request, response: Response) => {
    const [error, createClinicDto] = CreateClinicDto.create(request.body);
    if (error) return response.status(400).json({ error });

    this.clinicService
      .creatingClinic(createClinicDto!)
      .then((clinic) => response.json(clinic))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  updateClinic = (request: Request, response: Response) => {
    const [error, updateClinicDto] = UpdateClinicDto.update(request.body);
    if (error) return response.status(400).json({ error });

    this.clinicService
      .updatingClinic(updateClinicDto!)
      .then((updatedClinic) => response.json(updatedClinic))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };
}
