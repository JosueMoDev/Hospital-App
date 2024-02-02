import { AccountEntity, CLinicAssignmentDataSource,  ClinicAssignmentDto } from "../../domain";
import { ClinicAssignmentRepository } from '../../domain/repositories/clinicAssignment.repository';

export class ClinicAssignmentRepositoryImpl implements ClinicAssignmentRepository {

    constructor(private readonly datasourse: CLinicAssignmentDataSource) { }
    
    getAssingnableDoctors(): Promise<AccountEntity[]> {
        return this.datasourse.getAssingnableDoctors();
    }

    createAssignment(dto: ClinicAssignmentDto): Promise<boolean> {
        return this.datasourse.createAssignment(dto);
    }
    updateAssignment(dto: ClinicAssignmentDto): Promise<boolean> {
        return this.datasourse.updateAssignment(dto);
    }
    deleteAssignment(dto: ClinicAssignmentDto): Promise<boolean> {
        return this.datasourse.deleteAssignment(dto);
    }
}