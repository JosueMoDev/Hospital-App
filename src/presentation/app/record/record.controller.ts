import { Request, Response } from "express";
import { RecordService } from "../../services";
import { CreateRecordDto, HandlerError, UpdateAccountDto, UpdateRecordDto } from "../../../domain";

export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  createRecord = (request: Request, response: Response) => {
    const [error, createRecordDto] = CreateRecordDto.create(request.body);
    if (error) return response.status(400).json({ error });

    this.recordService
      .creatingRecord(createRecordDto!)
      .then((record) => response.json(record))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  updateRecord = (request: Request, response: Response) => {
    const [error, updateRecordDto] = UpdateRecordDto.update(request.body);
    if (error) return response.status(400).json({ error });

    this.recordService
      .updatingRecord(updateRecordDto!)
      .then((updatedRecord) => response.json(updatedRecord))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };
}
