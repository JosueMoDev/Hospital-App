import { Request, Response } from "express";
import { ClinicService } from "../../services";
import { CreateClinicDto, HandlerError } from "../../../domain";

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
    }
    
}