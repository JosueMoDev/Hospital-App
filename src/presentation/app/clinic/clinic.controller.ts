import { Request, Response } from "express";
import { ClinicService } from "../../services";
import {
  UpdateClinicDto,
  HandlerError,
  CreateClinicDto,
  PaginationDto,
  UploadDto,
} from "../../../domain";
import { UploadedFile } from "express-fileupload";

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
    const [error, clinicDto] = UpdateClinicDto.update(request.body);
    if (error) return response.status(400).json({ error });
    this.clinicService
      .changingStatus(clinicDto!)
      .then((clinic) => response.json(clinic))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  }


  uploadFile = (request: Request, response: Response) => {
    const [error, fileDto] = UploadDto.update(request.body);
    if (error) return response.status(400).json({ error });
    const file = request.body.files.at(0) as UploadedFile;

    this.clinicService
      .uploadingPhoto(fileDto!, file)
      .then((clinic) => response.json(clinic))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  }


}
