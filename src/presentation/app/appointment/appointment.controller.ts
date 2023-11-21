import { Request, Response } from "express";
import { AppointmentService } from "../../services";
import { CreateAppointmentDto, HandlerError, PaginationDto, UpdateAppointmentDto } from "../../../domain";

export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  createAppointment = (request: Request, response: Response) => {
    const [error, appointmentDto] = CreateAppointmentDto.create(request.body);
    if (error) return response.status(400).json({ error });

    this.appointmentService
      .creatingAppointment(appointmentDto!)
      .then((appointment) => response.json(appointment))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  updateAppointment = (request: Request, response: Response) => {
    const [error, updateAppointmentDto] = UpdateAppointmentDto.update(request.body);
    if (error) return response.status(400).json({ error });

    this.appointmentService
      .updatingAppointment(updateAppointmentDto!)
      .then((updatedAppointment) => response.json(updatedAppointment))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  findOneById = (request: Request, response: Response) => {
    this.appointmentService
      .findingAppointmentById(request.params.id)
      .then((appointment) => response.json(appointment))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  }

  findMany = (request: Request, response: Response) => {
    const [error, appointmentDto] = PaginationDto.create(request.body);
    if (error) return response.status(400).json({ error });
    this.appointmentService
      .findingManyAppointments(appointmentDto!)
      .then((appointments) => response.json(appointments))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  }

  deleteAppointment = (request: Request, response: Response) => {
    this.appointmentService
      .deletingAppointment(request.params.id)
      .then((result) => response.json(result))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  }
}