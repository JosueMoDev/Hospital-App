import { Request, Response } from "express";
import { RecordService } from "../../services";
import { CreateRecordDto, HandlerError, PaginationDto, UpdateAccountDto, UpdateRecordDto, UploadDto } from "../../../domain";
import { UploadedFile } from "express-fileupload";

export class RecordController {
  constructor(private readonly recordService: RecordService) { }

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

  findOneById = (request: Request, response: Response) => {
    this.recordService
      .findingOneById(request.params.id!)
      .then((record) => response.json(record))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  findMany = (request: Request, response: Response) => {
    const [error, pagDto] = PaginationDto.create(request.query);
    if (error) return response.status(400).json({ error });

    this.recordService
      .findingMany(pagDto!)
      .then((records) => response.json(records))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };


  changeStatus = (request: Request, response: Response) => {
    const [error, recordDto] = UpdateRecordDto.update(request.body);
    if (error) return response.status(400).json({ error });
    this.recordService
      .changingRecordStatus(recordDto!)
      .then((result) => response.json(result))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  uploadFile = (request: Request, response: Response) => {
    const [error, fileDto] = UploadDto.update(request.body);
    if (error) return response.status(400).json({ error });
    const file = request.body.files.at(0) as UploadedFile;

    this.recordService
      .uploadingPdf(fileDto!, file)
      .then((record) => response.json(record))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  }

  deleteFile = (request: Request, response: Response) => {
    const [error, fileDto] = UploadDto.update(request.body);
    if (error) return response.status(400).json({ error });

    this.recordService
      .deletingPdf(fileDto!)
      .then((record) => response.json(record))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  }



}
