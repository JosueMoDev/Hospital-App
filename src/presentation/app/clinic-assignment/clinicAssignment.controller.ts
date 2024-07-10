import { Request, Response } from "express";
import {
  ClinicAssignmentDto,
  ClinicAssignmentRepository,
  CreateClinicAssignment,
  DeleteClinicAssignment,
  GetAssignableDoctors,
  GetAssignedDoctors,
  GetDoctorsAssignedDto,
  HandlerError,
  UpdateClinicAssignment,
} from "../../../domain";

export class ClinicAssignmentController {
  constructor(
    private readonly clinicAssignmentRepository: ClinicAssignmentRepository
  ) {}

  getAssignableDoctors = (request: Request, response: Response) => {
      new GetAssignableDoctors(this.clinicAssignmentRepository)
      .excute()
      .then((doctorList) => response.json(doctorList))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  getAssignedDoctors = (request: Request, response: Response) => {
    const [error, getDoctorsAssigned] = GetDoctorsAssignedDto.create(
      request.params.clinic
    );
    if (error) return response.status(400).json({ error });
    new GetAssignedDoctors(this.clinicAssignmentRepository)
    .excute(getDoctorsAssigned?.clinic!)
      .then((doctorList) => response.json(doctorList))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  createClinicAssignment = (request: Request, response: Response) => {
    const [error, createClinicAssignmentDto] = ClinicAssignmentDto.create(
      request.body
    );
    if (error) return response.status(400).json({ error });
    new CreateClinicAssignment(this.clinicAssignmentRepository)
      .execute(createClinicAssignmentDto!)
      .then((clinicAssignment) => response.json(clinicAssignment))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  updateClinicAssignment = (request: Request, response: Response) => {
    const [error, updateClinicAssignmentDto] = ClinicAssignmentDto.create(
      request.body
    );
    if (error) return response.status(400).json({ error });

    new UpdateClinicAssignment(this.clinicAssignmentRepository)
    .execute(updateClinicAssignmentDto!)
      .then((clinicAssignment) => response.json(clinicAssignment))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  deleteClinicAssignment = (request: Request, response: Response) => {
    const [error, deleteClinicAssignmentDto] = ClinicAssignmentDto.create(
      request.body
    );
    if (error) return response.status(400).json({ error });
    new DeleteClinicAssignment(this.clinicAssignmentRepository)
      .execute(deleteClinicAssignmentDto!)
      .then((result) => response.json(result))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };
}
