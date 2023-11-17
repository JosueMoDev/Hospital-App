import { ClinicAssignmentEntity, CreateClinicAssignmentDto } from '..';
export abstract class CLinicAssignmentDataSource {
    abstract createAssignment(dto: CreateClinicAssignmentDto): Promise<ClinicAssignmentEntity>;
    abstract updateAssignment(dto: any): Promise<ClinicAssignmentEntity>
    abstract deleteAssignment(id: string): Promise<boolean>;
}