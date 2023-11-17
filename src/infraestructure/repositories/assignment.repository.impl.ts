import { CLinicAssignmentDataSource, ClinicAssignmentEntity, CreateClinicAssignmentDto } from "../../domain";
import { ClinicAssignmentRepository } from '../../domain/repositories/clinicAssignment.repository';

export class ClinicAssignmentRepositoryImpl implements ClinicAssignmentRepository{

    constructor(private readonly datasourse: CLinicAssignmentDataSource){}

    createAssignment(dto: CreateClinicAssignmentDto): Promise<ClinicAssignmentEntity> {
        return this.datasourse.createAssignment(dto);
    }
    updateAssignment(dto: any): Promise<ClinicAssignmentEntity> {
        throw new Error("Method not implemented.");
    }
    deleteAssignment(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}