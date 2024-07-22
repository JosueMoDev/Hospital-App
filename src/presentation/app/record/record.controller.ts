import { Request, Response } from "express";
import { ChangeRecordStatus, CreaateRecord, CreateRecordDto, DeleteRecordPDF, FindManyRecords, FindOneRecordById, HandlerError, PaginationDto, RecordRepository, UpdateRecord, UpdateRecordDto, UploadDto, UploadRecordPDF } from "../../../domain";
import { UploadedFile } from "express-fileupload";

export class RecordController {
  constructor(private readonly recordRepository: RecordRepository) { }

  createRecord = (request: Request, response: Response) => {
    const [error, createRecordDto] = CreateRecordDto.create(request.body);
    if (error) return response.status(400).json({ error });

    new CreaateRecord(this.recordRepository)
      .excute(createRecordDto!)
      .then((record) => response.json(record))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  updateRecord = (request: Request, response: Response) => {
    const [error, updateRecordDto] = UpdateRecordDto.update(request.body);
    if (error) return response.status(400).json({ error });

    new UpdateRecord(this.recordRepository)
      .execute(updateRecordDto!)
      .then((updatedRecord) => response.json(updatedRecord))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  findOneById = (request: Request, response: Response) => {
    new FindOneRecordById(this.recordRepository)
      .execute(request.params.id!)
      .then((record) => response.json(record))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };

  findMany = (request: Request, response: Response) => {
    const [error, pagDto] = PaginationDto.create(request.query);
    if (error) return response.status(400).json({ error });

    new FindManyRecords(this.recordRepository)
      .execute(pagDto!)
      .then((records) => response.json(records))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };


  changeStatus = (request: Request, response: Response) => {
    const [error, recordDto] = UpdateRecordDto.update(request.body);
    if (error) return response.status(400).json({ error });
    new ChangeRecordStatus(this.recordRepository)
      .execute(recordDto!)
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

    new UploadRecordPDF(this.recordRepository)
      .execute(fileDto!, file)
      .then((record) => response.json(record))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  }

  deleteFile = (request: Request, response: Response) => {
    const [error, fileDto] = UploadDto.update(request.body);
    if (error) return response.status(400).json({ error });

    new DeleteRecordPDF(this.recordRepository)
      .execute(fileDto!)
      .then((record) => response.json(record))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  }



}
