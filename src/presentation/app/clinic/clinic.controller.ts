import { Request, Response } from "express";
import { ClinicService } from "../../services";
import {
  UpdateClinicDto,
  HandlerError,
  CreateClinicDto,
  PaginationDto,
} from "../../../domain";

export class ClinicController {
  constructor(private readonly clinicService: ClinicService) { }

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

  findOneById = (request: Request, response: Response) => {
    this.clinicService
      .findingOneById(request.params.id)
      .then((clinic) => response.json(clinic))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  }

  findMany = (request: Request, response: Response) => {
    const [error, paginationDto] = PaginationDto.create(request.query);
    if (error) return response.status(400).json({ error });

    this.clinicService.findingMany(paginationDto!)
      .then((clinics) => response.json(clinics))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  }

  changeStatus = (request: Request, response: Response) => {
    this.clinicService
      .changingStatus(request.params.id)
      .then((clinic) => response.json(clinic))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  }


}
