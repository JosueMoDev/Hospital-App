import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { CustomErrors, CustomValidationErrors } from "../utils";

interface RecordDtoArgs {
    doctor: string,
    patient: string,
    title: string,
    body: string,
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
    public body!: string;


    constructor(args: RecordDtoArgs) {
        Object.assign(this, args);
    }

    static create(object: RecordDtoArgs): [undefined | CustomErrors[], CreateRecordDto?] {

        const recordDto = new CreateRecordDto(object);
        const [errors, updatedDto] = CustomValidationErrors.validateDto<CreateRecordDto>(recordDto);
        if (errors) return [errors];
        return [undefined, updatedDto];

    }
}