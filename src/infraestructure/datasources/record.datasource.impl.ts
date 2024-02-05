import { UploadedFile } from "express-fileupload";
import { AllowedFolder, DateFnsAdapter, prisma } from "../../config";
import { CreateRecordDto, CustomError, PaginationDto, PaginationEntity, RecordDataSource, RecordEntity, UpdateRecordDto, UploadDto } from "../../domain";
import { FileDataSourceImpl } from "./file.datasource.impl";
import { FileRepositoryImpl } from "../repositories";
import { FileService } from "../../presentation";

export class RecordDataSourceImpl implements RecordDataSource {
    private readonly datasource = new FileDataSourceImpl();
    private readonly repository = new FileRepositoryImpl(this.datasource);
    private readonly fileservice = new FileService(this.repository);

    async uploadPDF(dto: UploadDto, file: UploadedFile): Promise<boolean> {
        const record = await this.findOneById(dto.id);
        if (!file) throw CustomError.badRequest("File no enviado");
        const { fileUrl, fileId } = await this.fileservice.uploadingFile({
            file: {
                ...file,
                name: record.id
            },
            args: {
                folder: AllowedFolder.record,
                public_id: record.id
            }
        });
        const updateRecordPdf = await prisma.record.update({
          where: { id: dto.id },
          data: {
            pdfId: fileId,
            pdfUrl: fileUrl,
            lastUpdate: [
              ...record.lastUpdate,
              {
                account: dto.lastUpdate.account,
                date: DateFnsAdapter.formatDate(),
                action: "UPDATE RECORD",
              },
            ],
          },
        });
        if (updateRecordPdf) return true;
        return false;
    }
    async deletePDF(dto: UploadDto): Promise<boolean> {
        const record = await this.findOneById(dto.id);
        if (!record.pdfUrl.length && !record.pdfId.length) throw CustomError.notFound('that record not have any pdf associeted');

        const { result } = await this.fileservice.deletingFile(record.pdfId);
        if (result === 'not found') throw CustomError.internalServer('we couldnt delete pfd');
        const recordUpdated = await prisma.record.update({
            where: { id: dto.id },
            data: {
                pdfId: '',
                pdfUrl: '',
                lastUpdate: [...record.lastUpdate, {
                    account: dto.lastUpdate.account,
                    date: DateFnsAdapter.formatDate(),
                    action: "UPDATE RECORD",
                },]
            }
        });

        if (!recordUpdated) return false;
        return true;
    }

    async findOneById(id: string): Promise<RecordEntity> {
        const record = await prisma.record.findFirst({
            where: { id: id },
        });

        if (!record) throw CustomError.badRequest("Any record found");

        return RecordEntity.fromObject(record);
    }

    async findMany(dto: PaginationDto): Promise<{ pagination: PaginationEntity, records: RecordEntity[] }> {
        const { page: currentPage, pageSize } = dto;
        const [records, total] = await Promise.all([
            prisma.record.findMany({
                skip: (currentPage - 1) * pageSize,
                take: pageSize,
                where: {}
            }),
            prisma.record.count({ where: {} })
        ]);
        const totalPages = Math.ceil(total / pageSize);

        const nextPage = (currentPage < totalPages)
            ? `/api/record/find-many?page=${currentPage + 1}&pageSize=${pageSize}`
            : null;

        const previousPage = (currentPage > 1)
            ? `/api/record/find-many?page=${currentPage - 1}&pageSize=${pageSize}`
            : null;

        const pagination = PaginationEntity.pagination({
            currentPage,
            total,
            pageSize,
            nextPage,
            previousPage
        });
        const recordsMapped = records.map(RecordEntity.fromObject);
        return { pagination, records: recordsMapped }
    }
    async create(dto: CreateRecordDto): Promise<RecordEntity> {
        try {
            const newRecord = await prisma.record.create({
                data: {
                    ...dto,
                    createdAt: DateFnsAdapter.formatDate(),
                }
            });
            return RecordEntity.fromObject(newRecord);
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }
    async uptate(dto: UpdateRecordDto): Promise<RecordEntity> {
        const { id, lastUpdate, ...rest } = dto;
        if (Object.keys(rest).length === 0) throw CustomError.badRequest("Nothing to update");
        const record = await this.findOneById(id);

        try {
            const recordUpdated = await prisma.record.update({
                where: { id: id },
                data: {
                    ...rest,
                    lastUpdate: [
                        ...record.lastUpdate,
                        {
                            account: lastUpdate.account,
                            date: DateFnsAdapter.formatDate(),
                            action: "UPDATE RECORD",
                        },
                    ],
                },
            });
            return RecordEntity.fromObject(recordUpdated);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
    async changeRecordStatus(dto: UpdateRecordDto): Promise<RecordEntity> {
        const record = await this.findOneById(dto.id);
        try {
            const statusChanged = await prisma.record.update({
                where: {
                    id: record.id,
                },
                data: {
                    status: !record.status,
                    lastUpdate: [
                        ...record.lastUpdate,
                        {
                            ...dto.lastUpdate,
                            date: DateFnsAdapter.formatDate(),
                            action: "CHANGE RECORD VISIBILITY",
                        },
                    ],
                },
            });
            return RecordEntity.fromObject(statusChanged);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

}