import { Type } from "class-transformer";
import { ArrayMinSize, IsDate, IsMongoId, IsNotEmpty, IsString, validateSync } from "class-validator";

interface RecordDtoArgs {
    doctor: string,
    patient: string,
    title: string,
    body: string,
    lastEditedBy: LastEditedBy[]
}

class LastEditedBy {
    @IsMongoId()
    @IsNotEmpty({message: 'Doctor is required'})
    public readonly doctor: string; 
    @IsDate({ message: 'Date not valid' })
    @IsNotEmpty({message: 'Date is required'})
    public date: Date

    constructor(doctor: string, date: Date) {
        this.date = date,
        this.doctor = doctor
    }
}
export class createRecordDto {

    @IsMongoId()
    @IsNotEmpty({message: 'Doctor is required'})
    public readonly doctor: string;

    @IsMongoId()
    @IsNotEmpty({message: 'Patient is required'})
    public readonly patient: string;

    @IsString({ message: 'Title should be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    public title: string;

    @IsString({ message: 'Body should be a string' })
    @IsNotEmpty({ message: 'Body is required' })
    public body: string; @IsNotEmpty({ message: '' })   
    
    @ArrayMinSize(1, { message:'LastEdited field should have at least one item'})
    @Type(() => LastEditedBy)
    public lastEditedBy: LastEditedBy[];

    constructor(args: RecordDtoArgs) {
        const { doctor, patient, title, body, lastEditedBy } = args;
        this.doctor = doctor,
        this.patient = patient,
        this.title = title,
        this.body = body,
        this.lastEditedBy = lastEditedBy

    }

    static create(object: RecordDtoArgs): [string?, createRecordDto?] {
        
        const recordDto = new createRecordDto(object);

        const errors = validateSync(recordDto);

        if (errors.length > 0) {
            return [errors[0].toString()];
        }

        return [undefined, recordDto];

    }
}