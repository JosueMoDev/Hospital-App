import { Request, Response } from "express";
import {
  UpdateClinicDto,
  HandlerError,
  CreateClinicDto,
  PaginationDto,
  UploadDto,
  ClinicRepository,
  CreateClinic,
  UpdateClinic,
  FindClinicById,
  FindManyClinics,
  ChangeClinicStatus,
  UploadClinicPhoto,
  DeleteClinicPhoto,
} from "../../../domain";
import { UploadedFile } from "express-fileupload";

export class ClinicController {
  constructor(private readonly clinicRepository: ClinicRepository) { }

  createClinic = (request: Request, response: Response) => {
    const [error, createClinicDto] = CreateClinicDto.create(request.body);
    if (error) return response.status(400).json({ error });
    new CreateClinic(this.clinicRepository)
      .excute(createClinicDto!)
      .then((clinic) => response.json(clinic))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  updateClinic = (request: Request, response: Response) => {
    const [error, updateClinicDto] = UpdateClinicDto.update(request.body);
    if (error) return response.status(400).json({ error });
    new UpdateClinic(this.clinicRepository)
      .excute(updateClinicDto!)
      .then((updatedClinic) => response.json(updatedClinic))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  findOneById = (request: Request, response: Response) => {
    new FindClinicById(this.clinicRepository)
      .execute(request.params.id)
      .then((clinic) => response.json(clinic))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  }

  findMany = (request: Request, response: Response) => {
    const [error, paginationDto] = PaginationDto.create(request.query, request.originalUrl);
    if (error) return response.status(400).json({ error });
  
    new FindManyClinics(this.clinicRepository)
      .execute(paginationDto!, request.query.sort?.toString())
      .then((clinics) => response.json(clinics))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  }

  changeStatus = (request: Request, response: Response) => {
    const [error, clinicDto] = UpdateClinicDto.update(request.body);
    if (error) return response.status(400).json({ error });
      new ChangeClinicStatus(this.clinicRepository)
      .execute(clinicDto!)
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

    new UploadClinicPhoto(this.clinicRepository)
      .excute(fileDto!, file)
      .then((clinic) => response.json(clinic))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  }

  deleteFile = (request: Request, response: Response) => {
    const [error, fileDto] = UploadDto.update(request.body);
    if (error) return response.status(400).json({ error });

    new DeleteClinicPhoto(this.clinicRepository)
      .excute(fileDto!)
      .then((clinic) => response.json(clinic))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  }


}
