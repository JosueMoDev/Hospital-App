import { LastUpdate } from "@prisma/client";

interface RecordOptions {
    id: string,
    doctorId: string;
    patientId: string;
    createdAt: Date;
    title: string;
    pdfUrl: string;
    pdfId: string;
    status: boolean;
    lastUpdate: LastUpdate[];
}



export class RecordEntity {
    public id: string;
    public doctorId: string;
    public patientId: string;
    public createdAt: Date;
    public title: string;
    public pdfUrl: string;
    public pdfId: string;
    public status: boolean;
    public lastUpdate: LastUpdate[];

    constructor(options: RecordOptions) {
        const {
            id,
            doctorId,
            patientId,
            createdAt,
            title,
            pdfUrl,
            pdfId,
            status,
            lastUpdate,
        } = options;

        this.id = id;
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.createdAt = createdAt;
        this.title = title;
        this.pdfUrl = pdfUrl;
        this.pdfId = pdfId;
        this.status = status;
        this.lastUpdate = lastUpdate;
    }

    static fromObject(object: { [key: string]: any }): RecordEntity {
        const {
            id,
            doctorId,
            patientId,
            createdAt,
            title,
            pdfUrl,
            pdfId,
            status,
            lastUpdate
        } = object

        const record = new RecordEntity({
            id,
            doctorId,
            patientId,
            createdAt,
            title,
            pdfUrl,
            pdfId,
            status,
            lastUpdate,
        });

        return record;
    }

}