import { IsDate, IsMongoId, IsNotEmpty, validateSync } from "class-validator";

interface AppointmentDtoArgs {
    startDate: Date,
    endDate: Date,
    doctor: string,
    patient: string,
}

export class CreateAppointmentDto {
    @IsDate({ message: 'Date is invalid' })
    @IsNotEmpty({ message: 'Start Date is required' })
    public startDate: Date;

    @IsDate({ message: 'Date is invalid' })
    @IsNotEmpty({ message: 'End Date is required' })
    public endDate: Date;

    @IsMongoId()
    public readonly doctor: string;

    @IsMongoId()
    public readonly patient: string;

    constructor(args: AppointmentDtoArgs) {
        const { startDate, endDate, doctor, patient } = args;

        this.startDate = new Date(startDate),
        this.endDate = new Date(endDate),
        this.doctor = doctor,
        this.patient = patient

    }

    static create(object: AppointmentDtoArgs): [undefined | {[key:string]:string}, CreateAppointmentDto?] {
        
        const appointmentDto = new CreateAppointmentDto(object);

        const errors = validateSync(appointmentDto);

        if (errors.length > 0) {
            return [errors[0].constraints];
        }

        return [undefined, appointmentDto];

    }
}