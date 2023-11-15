import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsMongoId,  ValidateNested, validateSync } from "class-validator";

interface AssignmentDtoArgs {
    clinic: string,
    doctors: string[]
}

class Doctors {
    
  @IsMongoId({message: 'should be mongo id'})
  public readonly doctor: string;

  constructor(doctor: string) {
    this.doctor = doctor
  }

}

export class createAssignmentDto {
  @IsMongoId()
  public readonly clinic: string;
  @IsArray()
  @ArrayMinSize(1, { message: "An Assignment should have at least one doctor" })
  @Type(() => Doctors)
  @ValidateNested({ each: true })
  public doctors: Doctors[];

  constructor(args: AssignmentDtoArgs) {
    const { clinic, doctors } = args;
    const docs = doctors.map((doctor) =>  new Doctors(doctor));
 
    this.clinic = clinic,
    this.doctors = docs
  }

  static create( object: AssignmentDtoArgs): [undefined | { [key: string]: string }, AssignmentDtoArgs?] {
    const assignmentDto = new createAssignmentDto(object);
    const errors = validateSync(assignmentDto);

    const areMongoId = assignmentDto.doctors.map((doctor) => {
        const hasError = validateSync(new Doctors(doctor.doctor));
        if (hasError.length > 0) return hasError[0].constraints;
    });
    
    if(areMongoId.filter(error=>error!==undefined).length >0 ) {
        return [areMongoId.filter(error=>error!==undefined)[0]]
    }

    if (errors.length > 0) {
      return [errors[0].constraints];
    }
    const assignmentDtoMapped = {
      clinic: assignmentDto.clinic,
      doctors: assignmentDto.doctors.map((doctor)=>doctor.doctor),
    }
    return [undefined, assignmentDtoMapped];
  }
}