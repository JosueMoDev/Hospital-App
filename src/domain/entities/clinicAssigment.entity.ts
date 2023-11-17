export interface ClinicAssignmentOptions {
    clinic: string,
    doctors: string[]
}

export class ClinicAssignmentEntity {

    public clinic: string;
    public doctors: string[];

    constructor(options: ClinicAssignmentOptions) {
        const {clinic, doctors} = options;
        this.clinic = clinic;
        this.doctors = doctors;
    }

    static fromObject(object: {[key:string]: any}): ClinicAssignmentEntity {
        const {clinic, doctors} = object;
        const clinicAssignment = new ClinicAssignmentEntity({
            clinic,
            doctors
        });
        return clinicAssignment;
    }

}
