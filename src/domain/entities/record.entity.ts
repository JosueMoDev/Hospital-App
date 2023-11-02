export interface LastEditedBy {
    doctor: string;
    date: Date;
}
export interface RecordOptions {
    id: string,
    doctor: string;
    patient: string;
    createdAt: Date;
    title: string;
    body: string;
    lastEditedBy: LastEditedBy[];
    
}

export class RecordEntity {
    public id: string;
    public doctor: string;
    public patient: string;
    public createdAt: Date;
    public title: string;
    public body: string;
    public lastEditedBy: LastEditedBy[];

    constructor(options: RecordOptions){
        const {
            id,
            doctor,
            patient,
            createdAt,
            title,
            body,
            lastEditedBy,
        } = options;

        this.id = id;
        this.doctor = doctor;
        this.patient = patient;
        this.createdAt = createdAt;
        this.title = title;
        this.body = body;
        this.lastEditedBy = lastEditedBy;
    }

    static fromObject(object: {[key: string]: any}): RecordEntity {
        const {
            id,
            doctor,
            patient,
            createdAt,
            title,
            body,
            lastEditedBy
        }= object

        const record = new RecordEntity({
          id,
          doctor,
          patient,
          createdAt,
          title,
          body,
          lastEditedBy,
        });

        return record;
    }
}