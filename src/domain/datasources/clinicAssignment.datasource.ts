import { AccountEntity, ClinicAssignmentEntity, ClinicAssignmentDto } from '..';
export abstract class CLinicAssignmentDataSource {

    abstract getAssingnableDoctors(): Promise<AccountEntity[]>;

    abstract createAssignment(dto: ClinicAssignmentDto): Promise<boolean>;

    abstract updateAssignment(dto: ClinicAssignmentDto): Promise<boolean>
    
    abstract deleteAssignment(id: ClinicAssignmentDto): Promise<boolean>;
}