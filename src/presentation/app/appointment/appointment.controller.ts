import { Request, Response } from "express";
import { AppointmentService } from "../../services";
import { HandlerError, createAppointmentDto } from "../../../domain";

export class AppointmentController {

    constructor(private readonly appointmentService: AppointmentService) { }
    
    createAppointment = (request: Request, response: Response) => {
        const [error, appointmentDto] = createAppointmentDto.create(request.body);
        if (error) return response.status(400).json({ error });

        this.appointmentService
        .creatingAppointment(appointmentDto!)
        .then((appointment) => response.json(appointment))
        .catch((error) => {
            const { statusCode, errorMessage } = HandlerError.hasError(error);
            return response.status(statusCode).json({ error: errorMessage });
        });
    }

}