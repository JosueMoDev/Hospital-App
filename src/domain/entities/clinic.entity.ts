
export interface Adress{
    city: string,
    state: string,
    street: string
}
export interface ClinicOptions {
    id: string;
    regiterNumber: number;
    name: string;
    phone: string;
    adress: Adress;
    photoUrl: string;
    photoId: string;
    createdAt: Date;
    createdBy: string
}

export class ClinicEntity {
    public id: string;
    public registerNumber: number;
    public name: string;
    public phone: string;
    public adress: Adress;
    public photoUrl: string;
    public photoId: string;
    public createdAt: Date;
    public createdBy: string;

    constructor(options: ClinicOptions){
        const {
          id,
          regiterNumber,
          name,
          phone,
          adress,
          photoUrl,
          photoId,
          createdAt,
          createdBy,
        } = options;

        this.id = id,
        this.registerNumber = regiterNumber,
        this.name = name,
        this.phone = phone,
        this.adress = adress,
        this.photoUrl = photoUrl,
        this.photoId = photoId,
        this.createdAt = createdAt,
        this.createdBy = createdBy
    }

    static fromObject(object: {[key:string]: any}): ClinicEntity {
        const {
          id,
          regiterNumber,
          name,
          phone,
          adress,
          photoUrl,
          photoId,
          createdAt,
          createdBy,
        } = object;

        const clinic = new ClinicEntity({
          id,
          regiterNumber,
          name,
          phone,
          adress,
          photoUrl,
          photoId,
          createdAt,
          createdBy,
        });
        return clinic;
    }
}