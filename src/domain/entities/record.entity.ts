import { LastUpdate } from '../dtos/utils/lastUpdate';

export interface RecordOptions {
    id: string,
    doctor: string;
    patient: string;
    createdAt: Date;
    title: string;
    body: string;
    lastUpdate: LastUpdate[];

}

export class RecordEntity {
    public id: string;
    public doctor: string;
    public patient: string;
    public createdAt: Date;
    public title: string;
    public body: string;
    public lastUpdate: LastUpdate[];

    constructor(options: RecordOptions) {
        const {
            id,
            doctor,
            patient,
            createdAt,
            title,
            body,
            lastUpdate,
        } = options;

        this.id = id;
        this.doctor = doctor;
        this.patient = patient;
        this.createdAt = createdAt;
        this.title = title;
        this.body = body;
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
            lastUpdate
        } = object

        const record = new RecordEntity({
            id,
            doctor: doctorId,
            patient: patientId,
            createdAt,
            title,
            body: pdf,
            lastUpdate,
        });

        return record;
    }
}