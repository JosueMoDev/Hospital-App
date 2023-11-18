import { Type } from "class-transformer";
import { IsDate, IsMongoId, IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";
import { CustomErrors, CustomValidationErrors } from "../shared";

interface RecordDtoArgs {
    doctor: string,
    patient: string,
    title: string,
    body: string,
    lastEditedBy: LastEditedBy | any,
}

class LastEditedBy {
    @IsMongoId()
    @IsNotEmpty({message: 'Doctor is required'})
    public readonly doctor: string; 
    @IsDate({ message: 'Date not valid' })
    @IsNotEmpty({message: 'Date is required'})
    public date: Date

    constructor(doctor: string, date: Date) {
        this.date = new Date(date),
        this.doctor = doctor
    }

}
export class CreateRecordDto {

    @IsMongoId()
    @IsNotEmpty({message: 'Doctor is required'})
    public readonly doctor!: string;

    @IsMongoId()
    @IsNotEmpty({message: 'Patient is required'})
    public readonly patient!: string;

    @IsString({ message: 'Title should be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    public title!: string;

    @IsString({ message: 'Body should be a string' })
    @IsNotEmpty({ message: 'Body is required' })
    public body!: string; @IsNotEmpty({ message: '' })   

    @IsObject({message: 'Not an objected provided'})
    @ValidateNested()
    @IsNotEmpty({message:'Field Required'})
    @Type(() => LastEditedBy)
    public lastEditedBy: LastEditedBy;

    constructor(args: RecordDtoArgs) {
        Object.assign(this, args);
        // TODO: error cuando se optienen lastEdited by como undefine
        this.lastEditedBy = new LastEditedBy(args?.lastEditedBy.doctor, args?.lastEditedBy.date);

    }

    static create(object: RecordDtoArgs): [undefined | CustomErrors[], CreateRecordDto?] {
        
        const recordDto = new CreateRecordDto(object);
        const [errors, updatedDto] = CustomValidationErrors.validateDto<CreateRecordDto>(recordDto);
        if(errors) return[errors];
        return [undefined, updatedDto];

    }
}