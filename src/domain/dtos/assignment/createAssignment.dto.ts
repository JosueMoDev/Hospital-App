import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsMongoId,  ValidateNested, validateSync } from "class-validator";

interface AssignmentDtoArgs {
    clinic: string,
    doctors: Doctors[]
}

export class Doctors {
    @IsMongoId()
    public readonly doctor: string;

    constructor(doctor: string) {
        this.doctor = doctor
    }
}

export class createAssignmentDto {
   
    @IsMongoId()
    public readonly clinic: string;

    @IsArray()
    @ArrayMinSize(1, { message: 'An Assignment should have at least one doctor' })
    @ValidateNested({ each: true })
    @Type(() => Doctors)
    public doctors: Doctors[];

    constructor(args: AssignmentDtoArgs) {
        const { clinic, doctors } = args;
        this.clinic = clinic,
        this.doctors = doctors

    }

    static create(object: AssignmentDtoArgs): [undefined | {[key: string]: string}, createAssignmentDto?] {
        
        const assigntmentDto = new createAssignmentDto(object);

        const errors = validateSync(assigntmentDto);

        if (errors.length > 0) {
            return [errors[0].constraints];
        }

        return [undefined, assigntmentDto];

    }
}