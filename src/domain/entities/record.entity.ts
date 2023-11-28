import { LastUpdate } from '../dtos/utils/lastUpdate';

interface RecordOptions {
    id: string,
    doctorId: string;
    patientId: string;
    createdAt: Date;
    title: string;
    pdf: string;
    status: boolean;
    lastUpdate: LastUpdate[];
}



export class RecordEntity {
    public id: string;
    public doctorId: string;
    public patientId: string;
    public createdAt: Date;
    public title: string;
    public pdf: string;
    public status: boolean;
    public lastUpdate: LastUpdate[];

    constructor(options: RecordOptions) {
        const {
            id,
            doctorId,
            patientId,
            createdAt,
            title,
            pdf,
            status,
            lastUpdate,
        } = options;

        this.id = id;
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.createdAt = createdAt;
        this.title = title;
        this.pdf = pdf;
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
            pdf,
            status,
            lastUpdate
        } = object

        const record = new RecordEntity({
            id,
            doctorId,
            patientId,
            createdAt,
            title,
            pdf,
            status,
            lastUpdate,
        });

        return record;
    }

}