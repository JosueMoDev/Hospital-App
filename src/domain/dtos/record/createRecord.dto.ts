import { Type } from "class-transformer";
import { IsISO8601, IsMongoId, IsNotEmpty, IsObject, IsString, Matches, ValidateNested } from "class-validator";
import { CustomErrors, CustomValidationErrors } from "../utils";

interface RecordDtoArgs {
    doctor: string,
    patient: string,
    title: string,
    body: string,
    lastEditedBy: LastEditedBy | any,
}

class LastEditedBy {
    @IsMongoId()
    @IsNotEmpty({ message: 'Doctor is required' })
    public readonly doctor!: string;

    @IsNotEmpty({ message: 'Date is required' })
    @IsISO8601({ strict: true })
    @Matches(/^(\d{4})-(\d{2})-(\d{2})$/, {
        message: 'Start Date should be YYYY-MM-DD format .',
    })
    public date!: string;

    constructor(object: LastEditedBy) {
        Object.assign(this, object)
    }

}
export class CreateRecordDto {

    @IsMongoId()
    @IsNotEmpty({ message: 'Doctor is required' })
    public readonly doctor!: string;

    @IsMongoId()
    @IsNotEmpty({ message: 'Patient is required' })
    public readonly patient!: string;

    @IsString({ message: 'Title should be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    public title!: string;

    @IsString({ message: 'Body should be a string' })
    @IsNotEmpty({ message: 'Body is required' })
    public body!: string; @IsNotEmpty({ message: '' })

    @IsObject({ message: 'Not an objected provided' })
    @ValidateNested()
    @IsNotEmpty({ message: 'Field Required' })
    @Type(() => LastEditedBy)
    public lastEditedBy: LastEditedBy;

    constructor(args: RecordDtoArgs) {
        Object.assign(this, args);
        this.lastEditedBy = new LastEditedBy(args.lastEditedBy);

    }

    static create(object: RecordDtoArgs): [undefined | CustomErrors[], CreateRecordDto?] {

        const recordDto = new CreateRecordDto(object);
        const [errors, updatedDto] = CustomValidationErrors.validateDto<CreateRecordDto>(recordDto);
        if (errors) return [errors];
        return [undefined, updatedDto];

    }
}