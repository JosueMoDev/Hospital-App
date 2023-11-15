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
        const data = lastEditedBy.map(lastEditedBy => new LastEditedBy(lastEditedBy.doctor, lastEditedBy.date))
      
        this.doctor = doctor,
        this.patient = patient,
        this.title = title,
        this.body = body,
        this.lastEditedBy = data.map(({doctor, date})=>({doctor, date}))

    }

    static create(object: RecordDtoArgs): [undefined | {[key: string]: string}, createRecordDto?] {
        
        const recordDto = new createRecordDto(object);

        const errors = validateSync(recordDto);

        const isValidObject = recordDto.lastEditedBy.map(({date, doctor}) => {
            const hasError = validateSync(new LastEditedBy(doctor, date));
            if (hasError.length > 0) return hasError[0].constraints;
        });
    
        if(isValidObject.filter(error=>error!==undefined).length >0 ) {
            return [isValidObject.filter(error=>error!==undefined)[0]]
        }

        if (errors.length > 0) {
            return [errors[0].constraints];
        }

    

        return [undefined, recordDto];

    }
}