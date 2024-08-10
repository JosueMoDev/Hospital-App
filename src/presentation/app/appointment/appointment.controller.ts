import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
  PaginationDto,
} from '@domain/dtos';
import { AppointmentRepository } from '@domain/repositories';
import { HandlerError } from '@handler-errors';
import { Request, Response } from 'express';
import {
  CreateAppointment,
  UpdateAppoinment,
  FindAppointmentById,
  FindManyAppointments,
  DeleteAppointmentById,
} from 'src/domain';

export class AppointmentController {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  createAppointment = (request: Request, response: Response) => {
    const [error, appointmentDto] = CreateAppointmentDto.create(request.body);
    if (error) return response.status(400).json({ error });

    new CreateAppointment(this.appointmentRepository)
      .execute(appointmentDto!)
      .then((appointment) => response.json(appointment))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  updateAppointment = (request: Request, response: Response) => {
    const [error, updateAppointmentDto] = UpdateAppointmentDto.update(
      request.body,
    );
    if (error) return response.status(400).json({ error });

    new UpdateAppoinment(this.appointmentRepository)
      .excute(updateAppointmentDto!)
      .then((updatedAppointment) => response.json(updatedAppointment))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  findOneById = (request: Request, response: Response) => {
    new FindAppointmentById(this.appointmentRepository)
      .execute(request.params.id)
      .then((appointment) => response.json(appointment))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  findMany = (request: Request, response: Response) => {
    const [error, appointmentDto] = PaginationDto.create(
      request.query,
      request.originalUrl,
    );
    if (error) return response.status(400).json({ error });

    new FindManyAppointments(this.appointmentRepository)
      .execute(appointmentDto!)
      .then((appointments) => response.json(appointments))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  deleteAppointment = (request: Request, response: Response) => {
    new DeleteAppointmentById(this.appointmentRepository)
      .execute(request.params.id)
      .then((result) => response.json(result))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };
}
